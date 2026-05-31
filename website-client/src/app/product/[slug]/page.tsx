import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type Props = { params: Promise<{ slug: string }> }

export default async function ProductSlugPage({
  params,
}: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
