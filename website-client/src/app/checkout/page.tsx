"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import { products } from "@/lib/products";
import { toast } from "sonner";
import { FooterSection } from "@/components/home/FooterSection";

type CartItem = {
  id: string;
  product_slug: string;
  product_name: string;
  size: string;
  quantity: number;
  price_value: number;
};

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { getClient } = useSupabase();

  // Form Fields
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [country, setCountry] = useState("India");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Tamil Nadu");
  const [pinCode, setPinCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const fetchCart = useCallback(async () => {
    try {
      if (!user) return;
      const client = await getClient();
      const { data, error } = await client
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (err: any) {
      toast.error("Failed to fetch cart items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user, getClient]);

  useEffect(() => {
    if (isLoaded && user) {
      setEmailOrPhone(user.primaryEmailAddress?.emailAddress || "");
      fetchCart();
    } else if (isLoaded && !user) {
      setLoading(false);
    }
  }, [user, isLoaded, fetchCart]);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price_value || 0) * item.quantity,
    0
  );

  const validateForm = () => {
    if (!emailOrPhone.trim()) {
      toast.error("Please enter your email or mobile phone number");
      return false;
    }
    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Please enter your last name");
      return false;
    }
    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return false;
    }
    if (!city.trim()) {
      toast.error("Please enter your city");
      return false;
    }
    if (!pinCode.trim()) {
      toast.error("Please enter your PIN code");
      return false;
    }
    const pinRegex = /^[0-9]{6}$/;
    if (!pinRegex.test(pinCode.trim())) {
      toast.error("Please enter a valid 6-digit PIN code");
      return false;
    }
    return true;
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to complete checkout.");
      return;
    }

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const emailVal = emailOrPhone.includes("@") ? emailOrPhone.trim() : (user.primaryEmailAddress?.emailAddress || "");
      const phoneVal = !emailOrPhone.includes("@") ? emailOrPhone.trim() : "";

      const response = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailVal,
          phone: phoneVal,
          firstName,
          lastName,
          address,
          apartment,
          city,
          state,
          pinCode,
          paymentMethod,
          cartItems: cartItems.map(item => ({
            product_slug: item.product_slug,
            size: item.size,
            quantity: item.quantity
          }))
        })
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Failed to place order. Please try again.");
      }

      const generatedOrderId = resData.order?.id || ("AV-" + Math.floor(100000 + Math.random() * 900000));
      
      setOrderId(generatedOrderId);
      setOrderSuccess(true);
      toast.success(
        paymentMethod === "razorpay"
          ? "Payment Successful! Order Placed."
          : "Order Placed Successfully (Cash on Delivery)!"
      );
    } catch (err: any) {
      toast.error(`Checkout failed: ${err.message || "Please try again."}`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderOrderSummary = (isMobile: boolean) => {
    return (
      <div className={`rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 md:p-8 shadow-sm text-anna-foreground ${isMobile ? "lg:hidden mb-8" : "hidden lg:block"}`}>
        <h2 className="font-display text-2xl font-bold mb-6 text-anna-brand">Order Summary</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-6">
            <p className="font-sans text-sm text-anna-brand font-medium">No items in your cart.</p>
          </div>
        ) : (
          <>
            {/* Item breakdown */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {cartItems.map((item) => {
                const product = products.find((p) => p.slug === item.product_slug);
                return (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white/50 border border-black/15 p-1.5">
                      {product && (
                        <Image
                          src={product.detailSrc}
                          alt={product.detailAlt}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-display text-sm font-bold truncate leading-tight text-anna-brand">
                        {item.product_name}
                      </h3>
                      <p className="font-sans text-xs text-anna-brand font-medium mt-0.5">
                        Size: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-sans text-sm font-bold text-right shrink-0 text-anna-brand">
                      ₹{item.price_value * item.quantity}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-anna-brand/10 my-6" />

            {/* Calculations */}
            <div className="space-y-3 font-sans text-sm text-anna-brand font-medium">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-700 font-bold">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes</span>
                <span>₹0</span>
              </div>
            </div>

            <div className="h-px bg-anna-brand/10 my-6" />

            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="font-display text-xl font-bold text-anna-brand">Total</span>
              <span className="font-sans text-2xl font-bold text-anna-copper">
                ₹{total}
              </span>
            </div>
          </>
        )}
      </div>
    );
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-anna-background text-anna-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-anna-brand border-t-transparent" />
          <p className="font-display text-lg text-anna-brand font-medium">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-anna-background text-anna-foreground px-4">
        <h2 className="font-display text-4xl font-bold text-anna-brand">Please Sign In</h2>
        <p className="text-center text-anna-brand/90 font-medium max-w-md">
          You need to sign in to access checkout and place your order.
        </p>
        <SignInButton mode="modal">
          <button className="rounded bg-black px-8 py-3 font-display text-white hover:opacity-90 transition-opacity">
            Sign In to Account
          </button>
        </SignInButton>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-anna-background text-anna-foreground py-16 px-4 md:py-24 flex flex-col justify-between w-full overflow-x-hidden">
        <div className="mx-auto max-w-2xl rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-8 md:p-12 shadow-md text-center text-anna-foreground flex-grow mb-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-anna-brand">Thank You!</h1>
          <p className="font-sans text-lg text-green-700 font-bold mb-6">
            Your order has been placed successfully.
          </p>

          <div className="rounded-lg bg-[#FFF7E8]/70 p-6 mb-8 text-left border border-anna-brand/20">
            <p className="font-sans text-sm text-anna-brand font-medium mb-2">
              Order ID: <span className="font-bold text-black">{orderId}</span>
            </p>
            <p className="font-sans text-sm text-anna-brand font-medium mb-2">
              Payment Method:{" "}
              <span className="font-bold text-black uppercase">
                {paymentMethod === "razorpay" ? "Razorpay Secure" : "Cash on Delivery (COD)"}
              </span>
            </p>
            <p className="font-sans text-sm text-anna-brand font-medium mb-2">
              Estimated Delivery:{" "}
              <span className="font-bold text-black">
                {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
            <p className="font-sans text-sm text-anna-brand font-medium">
              Delivery Address:{" "}
              <span className="font-bold text-black">
                {firstName} {lastName}, {address}, {apartment ? apartment + ", " : ""}{" "}
                {city}, {state} - {pinCode}
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="rounded bg-anna-brand px-8 py-3.5 font-display text-white font-bold hover:bg-anna-forest transition-colors"
            >
              Continue Shopping
            </Link>
            <a
              href="https://wa.me/919385303504"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-[#25D366] bg-white px-8 py-3.5 font-display text-sm font-bold text-[#25d366] shadow-sm hover:bg-[#25d366]/5 transition-colors"
            >
              Support on WhatsApp
            </a>
          </div>
        </div>
        <div className="w-full relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <FooterSection style={{ position: "relative", top: "auto" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anna-background text-anna-foreground pt-[140px] flex flex-col justify-between w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex-grow pb-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Checkout Form (Column span 7) */}
          <div className="lg:col-span-7">
            <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-anna-brand hover:text-anna-copper font-medium mb-6 transition-colors">
              ← Return to Cart
            </Link>

            <form onSubmit={handlePayNow} className="space-y-8">
              
              {/* 1. Contact section */}
              <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 md:p-8 shadow-sm text-anna-foreground">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl font-bold text-anna-brand">Contact</h2>
                  <span className="text-xs text-anna-brand font-bold">Required *</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-email" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                      Email or Mobile phone number <span className="text-anna-copper">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="text"
                      placeholder="e.g. customer@example.com or 9876543210"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                      required
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="h-4 w-4 rounded border-anna-brand/20 text-anna-brand focus:ring-anna-brand"
                    />
                    <span className="font-sans text-xs text-anna-brand font-medium">
                      Email me with news and offers
                    </span>
                  </label>
                </div>
              </div>

              {/* 2. Delivery Address Form */}
              <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 md:p-8 shadow-sm text-anna-foreground">
                <h2 className="font-display text-2xl font-bold mb-6 text-anna-brand">Delivery Address</h2>
                
                <div className="space-y-4">
                  {/* Country Selection */}
                  <div>
                    <label htmlFor="delivery-country" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                      Country/Region
                    </label>
                    <select
                      id="delivery-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>

                  {/* Name grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                        First Name <span className="text-anna-copper">*</span>
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                        Last Name <span className="text-anna-copper">*</span>
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Address search input */}
                  <div>
                    <label htmlFor="address-search" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                      Address (Street name, Area, Locality) <span className="text-anna-copper">*</span>
                    </label>
                    <input
                      id="address-search"
                      type="text"
                      placeholder="e.g. 12, Gandhi Street, T-Nagar"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                      required
                    />
                  </div>

                  {/* Apartment / Suite */}
                  <div>
                    <label htmlFor="apartment" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                      Apartment, suite, unit, etc. (optional)
                    </label>
                    <input
                      id="apartment"
                      type="text"
                      placeholder="e.g. Apt 4B, 2nd Floor"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                    />
                  </div>

                  {/* City, State, PIN code */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="city" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                        City <span className="text-anna-copper">*</span>
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="e.g. Chennai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                        State <span className="text-anna-copper">*</span>
                      </label>
                      <select
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="pin-code" className="block font-sans text-sm font-medium text-anna-brand mb-1.5">
                        PIN code <span className="text-anna-copper">*</span>
                      </label>
                      <input
                        id="pin-code"
                        type="text"
                        placeholder="6 digits PIN"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        className="w-full rounded-md border border-anna-brand/25 focus:border-anna-copper focus:outline-none bg-white px-3 py-2.5 font-sans text-sm text-anna-foreground placeholder-black/50 transition-colors"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Mobile Order Summary Box (visible only on mobile) */}
              {renderOrderSummary(true)}

              {/* 4. Payment Options */}
              <div className="rounded-xl border border-anna-brand/20 bg-anna-cream/35 p-6 md:p-8 shadow-sm text-anna-foreground">
                <h2 className="font-display text-2xl font-bold mb-6 text-anna-brand">Payment</h2>
                <p className="font-sans text-sm text-anna-brand font-medium mb-4">All transactions are secure and encrypted.</p>
                
                <div className="rounded-lg border border-anna-brand/20 overflow-hidden">
                  
                  {/* Razorpay secure */}
                  <label className={`flex items-start justify-between p-4 cursor-pointer hover:bg-black/[0.02] transition-colors ${paymentMethod === "razorpay" ? "bg-anna-cream/10" : ""}`}>
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="mt-1 h-4 w-4 border-anna-brand/20 text-anna-brand focus:ring-anna-brand"
                      />
                      <div>
                        <span className="block font-display text-base font-bold text-anna-brand">Razorpay Secure</span>
                        <span className="block font-sans text-xs text-anna-brand font-medium mt-0.5">UPI, Cards, NetBanking, Wallets</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <div className="relative h-5 w-8 overflow-hidden bg-gray-100 rounded">
                        <Image src="/images/icon-bag.png" alt="Cards" fill className="object-contain p-0.5 opacity-50 brightness-0" sizes="32px" />
                      </div>
                    </div>
                  </label>

                  <div className="h-px bg-anna-brand/20" />

                  {/* Cash on Delivery */}
                  <label className={`flex items-start p-4 cursor-pointer hover:bg-black/[0.02] transition-colors ${paymentMethod === "cod" ? "bg-anna-cream/10" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 mr-3 h-4 w-4 border-anna-brand/20 text-anna-brand focus:ring-anna-brand"
                    />
                    <div>
                      <span className="block font-display text-base font-bold text-anna-brand">Cash on Delivery (COD)</span>
                      <span className="block font-sans text-xs text-anna-brand font-medium mt-0.5">Pay in cash or digital transfer on delivery</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* 5. Primary Action button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-anna-brand py-4 text-center font-display text-lg font-bold text-white hover:bg-anna-forest transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <span>
                    {paymentMethod === "razorpay" ? "Pay Now & Confirm Order" : "Place Order (COD)"}
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar (Column span 5) - visible only on desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] h-fit">
            {renderOrderSummary(false)}
          </div>
        </div>
      </div>
      
      {/* Footer block */}
      <div className="w-full relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <FooterSection style={{ position: "relative", top: "auto" }} />
      </div>
    </div>
  );
}
