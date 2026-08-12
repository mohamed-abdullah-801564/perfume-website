import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const defaultEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@annavalam.shop";
const defaultPassword = process.env.ADMIN_PASSWORD || "Annavalam@2026";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    let expectedPassword = defaultPassword;

    // Check if custom password was saved to server-side config file
    const configPath = path.join(process.cwd(), "admin-config.json");
    if (fs.existsSync(configPath)) {
      try {
        const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        if (configData.password) {
          expectedPassword = configData.password;
        }
      } catch (err) {
        console.error("Error reading admin-config.json:", err);
      }
    }

    if (email === defaultEmail && password === expectedPassword) {
      // Set secure cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authorized_admin_session_token", {
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
