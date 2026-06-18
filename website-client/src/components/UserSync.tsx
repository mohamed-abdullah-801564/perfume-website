"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function UserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const syncUser = async () => {
      const { error } = await supabase
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
        console.error(error);
      }
    };

    syncUser();
  }, [user, isLoaded]);

  return null;
}