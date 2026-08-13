import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.CLERK_SECRET_KEY || "fallback_secret_key_for_admin_session";

export function generateAdminToken(email: string): string {
  // Session is valid for 1 day
  const expires = Date.now() + 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ email, expires });
  
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  
  return Buffer.from(payload).toString("base64") + "." + signature;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    
    const [payloadB64, signature] = parts;
    const payloadStr = Buffer.from(payloadB64, "base64").toString("utf-8");
    const payload = JSON.parse(payloadStr);
    
    // Check expiration
    if (payload.expires < Date.now()) {
      return false;
    }
    
    // Re-verify HMAC
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(payloadStr);
    const expectedSignature = hmac.digest("hex");
    
    const expectedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@annavalam.shop";
    return signature === expectedSignature && payload.email === expectedEmail;
  } catch (err) {
    return false;
  }
}

export async function authorizeAdminRequest(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session")?.value;
    return verifyAdminToken(sessionToken);
  } catch (err) {
    console.error("Error retrieving admin session cookie:", err);
    return false;
  }
}
