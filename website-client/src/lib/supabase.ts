import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useCallback } from "react";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useSupabase() {
  const { getToken } = useAuth();

  const getClient = useCallback(async () => {
    try {
      let token = null;
      try {
        token = await getToken({ template: "supabase" });
      } catch (err) {
        console.warn(
          "Clerk supabase JWT template retrieval failed or is missing. Falling back to default anon client:",
          err
        );
      }

      if (token) {
        await supabase.auth.setSession({
          access_token: token,
          refresh_token: "",
        });
      } else {
        // Clear any set session if not logged in or template failed
        try {
          await supabase.auth.signOut();
        } catch (_) {}
      }
    } catch (e) {
      console.warn("Failed to configure Supabase session:", e);
    }
    return supabase;
  }, [getToken]);

  return { getClient };
}