import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

const ingredients = [
  {
    name: "Karuppu Kavuni Rice",
    src: "/ingredients-images/karuppu kavuni rice.png",
    text: ["Ancient black rice rich", "in antioxidants and", "iron."],
  },
  {
    name: "Mapillai Samba Rice",
    src: "/ingredients-images/mapillai samba rice.png",
    text: ["Traditional rice known", "for strength and", "energy support."],
  },
  {
    name: "Kattuyanam Rice",
    src: "/ingredients-images/kattuyam rice.png",
    text: ["Fiber-rich rice that", "supports digestion", "and wellness."],
  },
  {
    name: "Matta Rice",
    src: "/ingredients-images/matta rice.png",
    text: ["Nutritious red rice", "rich in minerals and", "fiber."],
  },
  {
    name: "Samai / Saamai (Little Millet)",
    src: "/ingredients-images/samai saamai (little millet).png",
    text: ["Light millet that", "supports weight", "management."],
  },
  {
    name: "Kollu (Horse Gram)",
    src: "/ingredients-images/kollu (horse gram).png",
    text: ["Protein-rich legume", "known for fat-burning", "benefits."],
  },
  {
    name: "Ulundhu (Black Gram)",
    src: "/ingredients-images/ulundhu (black gram).png",
    text: ["Protein-packed pulse", "that supports bone", "strength."],
  },
  {
    name: "Pachai Payaru (Green Gram)",
    src: "/ingredients-images/pachai payaru (green gram).png",
    text: ["Easy-to-digest", "legume rich in", "nutrients"],
  },
  {
    name: "Barley",
    src: "/ingredients-images/barley.png",
    text: ["Whole grain that", "supports digestion", "and heart health."],
  },
  {
    name: "Ragi (Finger Millet)",
    src: "/ingredients-images/ragi (finger millet).png",
    text: ["Calcium-rich millet", "good for bones and", "energy."],
  },
  {
    name: "Kodhumai (Wheat)",
    src: "/ingredients-images/kodhumai (wheat).png",
    text: ["Nutritious grain", "providing fiber and", "carbohydrates."],
  },
  {
    name: "Varagu (Kodo Millet)",
    src: "/ingredients-images/varagu (kodo millet).png",
    text: ["Healthy millet that", "helps maintain", "balanced nutrition."],
  },
  {
    name: "Badam (Almonds)",
    src: "/ingredients-images/badam (almonds).png",
    text: ["Nutrient-rich nuts", "packed with healthy", "fats and vitamins."],
  },
  {
    name: "Kathazhai Podi (Aloe Vera)",
    src: "/ingredients-images/kathazhai podi (aloe vera).png",
    text: ["Natural skin-soothing", "and hydrating herb."],
  },
  {
    name: "Avaram Poo",
    src: "/ingredients-images/avaram poo.png",
    text: ["Traditional flower", "used for glowing and", "healthy skin."],
  },
  {
    name: "Orithal Thamarai",
    src: "/ingredients-images/orithal thamarai.png",
    text: ["Herbal ingredient", "valued in traditional", "wellness care."],
  },
  {
    name: "Roja Poo (Rose Petals)",
    src: "/ingredients-images/roja poo (rose petals).png",
    text: ["Refreshing flower that", "softens and brightens", "skin."],
  },
  {
    name: "Kuppaimeni",
    src: "/ingredients-images/kuppaimeni.png",
    text: ["Herbal plant", "commonly used for", "skin cleansing."],
  },
  {
    name: "Thulasi (Tulsi)",
    src: "/ingredients-images/thulasi (tulsi).png",
    text: ["Sacred herb known", "for antibacterial and", "healing properties."],
  },
  {
    name: "Karboga Arisi (Babchi Seeds)",
    src: "/ingredients-images/karboga arisi (babchi seeds).png",
    text: ["Traditional herb used", "for skin support."],
  },
  {
    name: "Rosemary Leaves",
    src: "/ingredients-images/rosemary leaves.png",
    text: ["Herb that supports", "hair growth and scalp", "health."],
  },
  {
    name: "Coconut Oil",
    src: "/ingredients-images/coconut oil.png",
    text: ["Natural oil that deeply", "nourishes hair and", "skin."],
  },
  {
    name: "Curry Leaves",
    src: "/ingredients-images/curry leaves.png",
    text: ["Rich in nutrients that", "strengthen hair roots."],
  },
  {
    name: "Fenugreek Seeds",
    src: "/ingredients-images/fenugreek seeds.png",
    text: ["Seeds known to", "reduce hair fall and", "dandruff."],
  },
  {
    name: "Hibiscus Flowers",
    src: "/ingredients-images/Rectangle 67.png",
    text: ["Natural flower that", "promotes soft and", "healthy hair."],
  },
  {
    name: "Amla",
    src: "/ingredients-images/amla.png",
    text: ["Vitamin C-rich fruit", "that supports strong", "hair growth."],
  },
  {
    name: "Bhringraj Leaves",
    src: "/ingredients-images/bhringraj leaves.png",
    text: ["Ayurvedic herb", "traditionally used for", "hair nourishment."],
  },
];

export default function IngredientsPage() {
  return (
    <main className="min-h-screen bg-anna-background text-anna-foreground">
      <section className="relative mx-auto w-full max-w-site overflow-hidden bg-anna-background">
        <div className="relative h-[665px] w-full overflow-hidden">
          <Image
            src="/ingredients-images/image 34.png"
            alt="Oil bubbles in water"
            fill
            priority
            className="object-cover object-bottom"
            sizes="1440px"
          />


          <h1 className="absolute left-[52px] top-[432px] z-10 text-anna-foreground">
            <span className="block font-serif text-[76px] font-normal leading-[0.78]">
              Our
            </span>
            <span className="block font-script text-[82px] font-normal leading-[0.72]">
              Ingredients
            </span>
          </h1>

          <p className="absolute right-[52px] top-[454px] z-10 w-[188px] text-right font-sans text-[22px] font-bold leading-[1.05] text-anna-foreground">
            Discover the key
            <br />
            ingredients that
            <br />
            make our products
            <br />
            truly transformative.
          </p>
        </div>

        <section className="grid grid-cols-[251px_251px_251px] justify-center gap-x-[104px] gap-y-[72px] px-[70px] py-[54px]">
          {ingredients.map((ingredient) => (
            <article key={ingredient.name} className="w-[251px]">
              <div className="relative h-[247px] w-[251px] overflow-hidden rounded-[8px]">
                <Image
                  src={ingredient.src}
                  alt={ingredient.name}
                  fill
                  className="object-cover"
                  sizes="251px"
                />
              </div>
              <h2 className="mt-[18px] font-display text-[22px] font-normal leading-none text-anna-foreground">
                {ingredient.name}
              </h2>
              <p className="mt-[12px] font-sans text-[18px] font-normal leading-[1.04] text-anna-foreground">
                {ingredient.text.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </section>

        <section className="grid min-h-[670px] grid-cols-[520px_520px] justify-center gap-[68px] pt-[18px]">
          <div className="relative h-[520px] w-[520px] overflow-hidden rounded-[10px]">
            <Image
              src="/brand-images/image 35.png"
              alt=""
              fill
              className="object-cover"
              sizes="520px"
            />
            <div className="absolute bottom-[22px] left-[22px] flex h-[54px] w-[187px] items-center justify-center rounded-[6px] border border-white/85 bg-white/5">
              <span className="font-display text-[38px] font-normal leading-none text-white">
                About us
              </span>
            </div>
          </div>

          <div className="relative h-[520px] w-[520px] overflow-hidden rounded-[10px]">
            <Image
              src="/brand-images/Rectangle 32.png"
              alt=""
              fill
              className="object-cover"
              sizes="520px"
            />
            <div className="absolute bottom-[22px] left-[22px] flex h-[54px] w-[180px] items-center justify-center rounded-[6px] border border-white/85 bg-white/5">
              <span className="font-display text-[38px] font-normal leading-none text-white">
                Values
              </span>
            </div>
          </div>
        </section>

      </section>
      <SiteFooter />
    </main>
  );
}
