import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const {
      email,
      phone,
      firstName,
      lastName,
      address,
      apartment,
      city,
      state,
      pinCode,
      paymentMethod,
      cartItems,
    } = await request.json();

    // Basic fields validation
    if (!email || !firstName || !lastName || !address || !city || !pinCode || !paymentMethod) {
      return NextResponse.json({ success: false, error: "Missing required shipping information fields" }, { status: 400 });
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 });
    }

    // Verify products and resolve pricing on the server side
    const verifiedItems: any[] = [];
    for (const item of cartItems) {
      const product = products.find((p) => p.slug === item.product_slug);
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Invalid product slug: ${item.product_slug}` },
          { status: 400 }
        );
      }

      // Look up price by size or fall back to base product price
      const priceValue = (product.sizePrices && product.sizePrices[item.size]) ?? product.priceValue;
      verifiedItems.push({
        product_slug: item.product_slug,
        product_name: product.name,
        size: item.size,
        quantity: item.quantity,
        price_value: priceValue,
      });
    }

    const totalAmount = verifiedItems.reduce((sum, item) => sum + item.price_value * item.quantity, 0);

    // Write to Supabase using the service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseKey) {
      return NextResponse.json(
        { success: false, error: "SUPABASE_SERVICE_ROLE_KEY is required and missing" },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    const { data: insertedOrder, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: userId,
        email: email,
        phone: phone || "",
        first_name: firstName,
        last_name: lastName,
        address: address,
        apartment: apartment || "",
        city: city,
        state: state,
        pin_code: pinCode,
        payment_method: paymentMethod,
        total_amount: totalAmount,
        items: verifiedItems,
        status: "Pending",
      })
      .select();

    if (orderError) {
      console.error("Order insertion failed in database:", orderError);
      return NextResponse.json({ success: false, error: orderError.message }, { status: 500 });
    }

    if (!insertedOrder || insertedOrder.length === 0) {
      return NextResponse.json({ success: false, error: "Order insertion succeeded but no data returned" }, { status: 500 });
    }

    // Clear cart in database
    const { error: cartError } = await supabaseAdmin
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    if (cartError) {
      console.warn("Failed to clear cart items for user after order creation:", cartError.message);
    }

    return NextResponse.json({ success: true, order: insertedOrder[0] });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
