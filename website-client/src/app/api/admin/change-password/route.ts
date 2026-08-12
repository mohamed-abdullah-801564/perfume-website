import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;

    if (sessionToken !== "authorized_admin_session_token") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { newPassword } = await request.json();
    if (!newPassword || !newPassword.trim()) {
      return NextResponse.json({ success: false, error: "Password cannot be empty" }, { status: 400 });
    }

    const configPath = path.join(process.cwd(), "admin-config.json");
    fs.writeFileSync(configPath, JSON.stringify({ password: newPassword }, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
