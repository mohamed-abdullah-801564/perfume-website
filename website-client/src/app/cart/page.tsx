"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser, SignInButton } from "@clerk/nextjs";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { supabase } from "@/lib/supabase";
import { products } from "@/lib/products";

type CartItem = {
  id: string;
  product_slug: string;
  product_name: string;
  size: string;
  quantity: number;
  price_value: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, isLoaded } = useUser();

  const customHeight = 2200;
  const footerTop = 1720;

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id);

      if (!error) {
        setCartItems(data || []);
      }
    };

    fetchCart();
  }, [user]);

  const removeItem = async (id: string) => {
    await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price_value || 0) * item.quantity,
    0
  );

  if (!isLoaded) return null;

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6">
        <h2 className="text-4xl font-bold">Please Sign In</h2>
        <p>Sign in to view your cart and continue shopping.</p>
        <SignInButton mode="modal">
          <button className="rounded bg-black px-6 py-3 text-white">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <FigmaScaler customHeight={customHeight}>
      <main
        className="relative bg-anna-background"
        style={{
          width: FIGMA_HOME.width,
          height: customHeight,
        }}
      >
        <section className="mx-auto w-full max-w-site px-[54px] pt-[140px]">
          <h1 className="font-script text-[64px] font-normal leading-none text-anna-foreground">
            Shopping Cart
          </h1>

          <p className="mt-3 font-display text-[27px] leading-[1.24] text-anna-foreground">
            Review your selected products and proceed to checkout.
          </p>

          <div className="mt-8 h-px w-full bg-black/15" />
        </section>

        <section className="mx-auto mt-[60px] w-full max-w-site px-[54px]">
          {cartItems.length === 0 ? (
            <div className="flex h-[400px] items-center justify-center rounded-[12px] border border-black/10 bg-white">
              <p className="font-display text-[32px] text-anna-foreground">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div key={item.id}>
                    {(() => {
                      const productData = products.find(
                        (product) => product.slug === item.product_slug
                      );

                      return (
                  <div
                    className="flex gap-8 rounded-[10px] border border-black/10 bg-white p-6 shadow-sm"
                  >
                    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-[8px] bg-anna-cream">
                      <Image
                        src={productData?.detailSrc || "/images/placeholder.png"}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="font-display text-[28px] text-anna-foreground">
                        {item.product_name}
                      </h2>

                      <p className="mt-2 text-[16px] text-black/70">
                        Size: {item.size}
                      </p>

                      <p className="text-[16px] text-black/70">
                        Qty: {item.quantity}
                      </p>

                      <p className="mt-3 text-[22px] font-bold text-anna-foreground">
                        ₹{(item.price_value || 0) * item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="h-[40px] rounded-[4px] border border-red-400 px-4 text-red-500 transition-colors hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                      );
                    })()}
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-end">
                <div className="w-[350px] rounded-[10px] border border-black/10 bg-white p-8 shadow-sm">
                  <h2 className="font-display text-[32px] text-anna-foreground">
                    Total
                  </h2>

                  <div className="mt-4 h-px bg-black/10" />

                  <p className="mt-4 text-[36px] font-bold text-anna-foreground">
                    ₹{total}
                  </p>

                  <button className="mt-6 h-[50px] w-full rounded-[6px] bg-black font-bold text-white transition-opacity hover:opacity-90">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        <FooterSection style={{ top: footerTop }} />
      </main>
    </FigmaScaler>
  );
}