import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { authorizeAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const isAuthorized = await authorizeAdminRequest();
    if (!isAuthorized) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { newPassword } = await request.json();
    if (!newPassword || !newPassword.trim()) {
      return NextResponse.json({ success: false, error: "Password cannot be empty" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseKey) {
      return NextResponse.json(
        { success: false, error: "SUPABASE_SERVICE_ROLE_KEY is required to change password." },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    // Hash the password using bcryptjs
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const { error: dbError } = await supabaseAdmin
      .from("admin_settings")
      .upsert({
        key: "admin_password_hash",
        value: hashedPassword
      });

    if (dbError) {
      throw new Error(`Database error saving password: ${dbError.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

