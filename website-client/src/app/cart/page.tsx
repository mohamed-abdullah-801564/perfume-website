"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { FooterSection } from "@/components/home/FooterSection";
import { MobileFooter } from "@/components/MobileFooter";
import { useSupabase } from "@/lib/supabase";
import { products } from "@/lib/products";
import { toast } from "sonner";

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
  const { getClient } = useSupabase();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      const client = await getClient();
      const { data, error } = await client
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id);

      if (!error) {
        setCartItems(data || []);
      }
    };

    fetchCart();
  }, [user, getClient]);

  const removeItem = async (id: string) => {
    const client = await getClient();
    const { error } = await client
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to remove item from cart", {
        description: error.message,
      });
      return;
    }

    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price_value || 0) * item.quantity,
    0
  );

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-anna-background text-anna-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-anna-brand border-t-transparent" />
          <p className="font-display text-lg text-anna-brand font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-anna-background text-anna-foreground px-4">
        <div className="mx-auto max-w-md rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-8 shadow-md text-center text-anna-foreground">
          <h2 className="font-display text-4xl font-bold text-anna-brand mb-2">Please Sign In</h2>
          <p className="text-center text-anna-brand/90 font-medium mb-6">
            Sign in to view your cart and continue shopping.
          </p>
          <SignInButton mode="modal">
            <button className="rounded bg-black px-6 py-3 text-white font-bold hover:opacity-90 transition-opacity">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anna-background text-anna-foreground pt-[100px] flex flex-col justify-between w-full overflow-x-hidden">
      <main className="mx-auto w-full max-w-site px-4 sm:px-[54px] flex-grow pb-16">
        <h1 className="font-script text-[64px] font-normal leading-none text-anna-brand">
          Shopping Cart
        </h1>

        <p className="mt-3 font-display text-[20px] lg:text-[27px] leading-[1.24] text-anna-brand">
          Review your selected products and proceed to checkout.
        </p>

        <div className="mt-8 h-px w-full bg-anna-brand/10 mb-10" />

        {cartItems.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center rounded-xl border border-anna-brand/20 bg-anna-cream/30">
            <p className="font-display text-2xl lg:text-3xl text-anna-brand">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Cart Items List (Column span 2) */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const productData = products.find(
                  (product) => product.slug === item.product_slug
                );

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 sm:gap-6 rounded-xl border border-anna-brand/15 bg-anna-cream/35 p-4 sm:p-6 shadow-sm items-center hover:scale-[1.01] transition-transform text-anna-brand"
                  >
                    <div className="relative h-24 w-20 sm:h-32 sm:w-24 shrink-0 overflow-hidden rounded-lg bg-white/70 border border-anna-brand/10">
                      <Image
                        src={productData?.detailSrc || "/images/placeholder.png"}
                        alt={item.product_name}
                        fill
                        className="object-contain p-1.5"
                        sizes="(max-width: 768px) 80px, 120px"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-anna-brand truncate">
                        {item.product_name}
                      </h3>

                      <p className="mt-2 text-sm text-anna-brand/90 font-medium">
                        Size: {item.size}
                      </p>

                      <p className="text-sm text-anna-brand/90 font-medium mt-0.5">
                        Qty: {item.quantity}
                      </p>

                      <p className="mt-3 text-lg sm:text-xl font-bold text-anna-copper">
                        ₹{(item.price_value || 0) * item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-md border border-red-200 px-3.5 py-2 text-sm text-red-500 font-medium hover:bg-red-50 transition-colors shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Total Order Summary Card (Column span 1) */}
            <div className="lg:col-span-1 lg:sticky lg:top-24">
              <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 sm:p-8 shadow-sm text-anna-brand">
                <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4 text-anna-brand">
                  Order Summary
                </h3>
                
                <div className="flex justify-between font-sans text-sm mb-2 text-anna-brand/90 font-medium">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between font-sans text-sm mb-4 text-anna-brand/90 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-700 font-bold">Free</span>
                </div>

                <div className="h-px bg-anna-brand/10 my-4" />

                <div className="flex justify-between font-display text-xl lg:text-2xl font-bold text-anna-brand">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <Link href="/checkout" className="block mt-6 w-full">
                  <button className="w-full rounded bg-anna-brand py-3 text-center font-display text-lg text-white hover:bg-anna-forest transition-colors font-bold">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Render correct footer on mobile and desktop */}
      <div className="w-full relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <FooterSection style={{ position: "relative", top: "auto" }} />
      </div>
      <div className="xl:hidden w-full relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <MobileFooter />
      </div>
    </div>
  );
}