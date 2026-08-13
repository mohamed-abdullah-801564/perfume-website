import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/adminAuth";

export async function GET() {
  const isAuthenticated = await authorizeAdminRequest();
  return NextResponse.json({ authenticated: isAuthenticated });
}

