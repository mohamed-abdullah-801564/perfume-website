"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSupabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function UserSync() {
  const { user, isLoaded } = useUser();
  const { getClient } = useSupabase();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const syncUser = async () => {
      try {
        const client = await getClient();
        const { error } = await client
          .from("users")
          .upsert(
            {
              clerk_id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              first_name: user.firstName,
              last_name: user.lastName,
              image_url: user.imageUrl,
            },
            {
              onConflict: "clerk_id",
            }
          );

        if (error) {
          console.warn("Gracefully handled user upsert database exception:", error.message);
          toast.warning("Profile Sync", {
            description: "Unable to sync your profile details right now, but you can continue shopping.",
          });
        }
      } catch (err: any) {
        console.warn("Gracefully handled user upsert runtime exception:", err.message || err);
        toast.warning("Profile Sync", {
          description: "Unable to sync your profile details right now, but you can continue shopping.",
        });
      }
    };

    syncUser();
  }, [user, isLoaded, getClient]);

  return null;
}