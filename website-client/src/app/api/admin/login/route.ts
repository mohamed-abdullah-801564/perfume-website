import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { generateAdminToken } from "@/lib/adminAuth";

const defaultEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@annavalam.shop";
const defaultPassword = process.env.ADMIN_PASSWORD || "Annavalam@2026";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email !== defaultEmail) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    let isPasswordCorrect = false;
    let databasePasswordHash: string | null = null;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseKey) {
      try {
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabaseAdmin
          .from("admin_settings")
          .select("value")
          .eq("key", "admin_password_hash")
          .maybeSingle();

        if (!error && data && data.value) {
          databasePasswordHash = data.value;
        }
      } catch (err) {
        console.warn("Failed to check admin password in Supabase settings:", err);
      }
    } else {
      console.warn("SUPABASE_SERVICE_ROLE_KEY not configured, falling back to default password.");
    }

    if (databasePasswordHash) {
      // Compare with bcrypt hash from Supabase
      isPasswordCorrect = await bcrypt.compare(password, databasePasswordHash);
    } else {
      // Fallback to default password (either plain text or bcrypt hash if default password matches bcrypt format)
      if (defaultPassword.startsWith("$2a$") || defaultPassword.startsWith("$2b$") || defaultPassword.startsWith("$2y$")) {
        isPasswordCorrect = await bcrypt.compare(password, defaultPassword);
      } else {
        isPasswordCorrect = (password === defaultPassword);
      }
    }

    if (isPasswordCorrect) {
      // Set secure cookie using the helper
      const token = generateAdminToken(email);
      const cookieStore = await cookies();
      cookieStore.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password. Please try again." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

