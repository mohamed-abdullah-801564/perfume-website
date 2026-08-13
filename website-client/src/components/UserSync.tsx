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

        try {
          const stored = localStorage.getItem("anna_favorites");
          if (stored) {
            const localSlugs = JSON.parse(stored);
            if (Array.isArray(localSlugs) && localSlugs.length > 0) {
              for (const slug of localSlugs) {
                if (typeof slug !== "string") continue;
                try {
                  await client
                    .from("favorites")
                    .upsert(
                      {
                        user_id: user.id,
                        product_slug: slug,
                      },
                      {
                        onConflict: "user_id,product_slug",
                      }
                    );
                } catch (_) {
                  // ignore individual errors, continue processing
                }
              }
            }
            localStorage.removeItem("anna_favorites");
          }
        } catch (favSyncError) {
          // ignore outer errors silently
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