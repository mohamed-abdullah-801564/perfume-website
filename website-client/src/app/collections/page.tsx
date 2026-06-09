import CollectionsDesktop from "@/components/collections/CollectionsDesktop";
import { CollectionsMobile } from "@/components/collections/CollectionsMobile";

export default function CollectionsPage() {
  return (
    <>
      <div className="hidden xl:block">
        <CollectionsDesktop />
      </div>

      <div className="xl:hidden">
        <CollectionsMobile />
      </div>
    </>
  );
}