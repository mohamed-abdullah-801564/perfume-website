import { ProductDetail } from "@/components/product/ProductDetail";
import { getProductBySlug, products } from "@/lib/products";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";


export default function ProductPage() {
  const { user } = useUser();
  const product = getProductBySlug("black-rice-porridge-mix") ?? products[0];

  return <ProductDetail product={product} />;
}
