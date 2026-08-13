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

        // Sync local favorites to Supabase
        try {
          const stored = localStorage.getItem("anna_favorites");
          if (stored) {
            const localSlugs = JSON.parse(stored);
            if (Array.isArray(localSlugs) && localSlugs.length > 0) {
              const { data: dbFavorites, error: favError } = await client
                .from("favorites")
                .select("product_slug")
                .eq("user_id", user.id);

              if (!favError) {
                const dbSlugs = new Set((dbFavorites || []).map((f: any) => f.product_slug));
                const toInsert = localSlugs.filter((slug) => typeof slug === "string" && !dbSlugs.has(slug));

                if (toInsert.length > 0) {
                  const insertData = toInsert.map((slug) => ({
                    user_id: user.id,
                    product_slug: slug,
                  }));

                  const { error: insertError } = await client
                    .from("favorites")
                    .insert(insertData);

                  if (!insertError) {
                    localStorage.removeItem("anna_favorites");
                  } else {
                    console.error("Failed to merge local favorites to Supabase:", insertError);
                  }
                } else {
                  localStorage.removeItem("anna_favorites");
                }
              }
            } else {
              localStorage.removeItem("anna_favorites");
            }
          }
        } catch (favSyncError) {
          console.error("Error syncing favorites from localStorage:", favSyncError);
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