import { ProductDetail } from "@/components/product/ProductDetail";
import { getProductBySlug, products } from "@/lib/products";



export default function ProductPage() {
  const product = getProductBySlug("black-rice-porridge-mix") ?? products[0];

  return <ProductDetail product={product} />;
}
