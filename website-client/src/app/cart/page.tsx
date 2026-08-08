"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { supabase } from "@/lib/supabase";
import { products } from "@/lib/products";
import { toast } from "sonner";
import { MobileFooter } from "@/components/MobileFooter";

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

  const footerTop = 1720;
  const customHeight = footerTop + 477; // 2197 (footerTop + footer height)

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
    const { error } = await supabase
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
    <div className="relative bg-anna-background">
      {/* Desktop view */}
      <div className="hidden xl:block">
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
      </div>

      {/* Mobile view */}
      <div className="xl:hidden bg-anna-background text-anna-foreground min-h-screen flex flex-col pt-16 animate-fade-in">
        <main className="flex-grow px-4 py-6 sm:px-8">
          <h1 className="font-display text-[32px] font-normal mb-6">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-sans text-lg text-anna-charcoal mb-4">Your cart is empty.</p>
              <Link href="/collections" className="inline-block rounded bg-anna-brand px-6 py-2.5 font-display text-white">
                Shop Our Products
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Cart items list */}
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = products.find((p) => p.slug === item.product_slug);
                  return (
                    <div key={item.id} className="flex gap-4 rounded-lg bg-anna-cream/30 p-3 border border-black/5">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-anna-cream">
                        {product && (
                          <Image
                            src={product.detailSrc}
                            alt={product.detailAlt}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        )}
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-display text-base font-bold leading-tight">{item.product_name}</h3>
                          <p className="font-sans text-xs text-black/50 mt-1">Size: {item.size}</p>
                          <p className="font-sans text-xs text-black/50 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-sans text-sm font-bold">₹{item.price_value * item.quantity}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-anna-copper font-sans text-sm hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary card */}
              <div className="rounded-lg bg-anna-cream/50 p-5 border border-black/10">
                <h3 className="font-display text-xl font-bold mb-4">Order Summary</h3>
                <div className="flex justify-between font-sans text-sm mb-2">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between font-sans text-sm mb-4">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="h-px bg-black/10 my-3" />
                <div className="flex justify-between font-display text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button className="mt-6 w-full rounded bg-anna-brand py-3 text-center font-display text-lg text-white hover:bg-anna-forest transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </main>
        <MobileFooter />
      </div>
    </div>
  );
}