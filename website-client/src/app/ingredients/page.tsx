import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { MobileFooter } from "@/components/MobileFooter";

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

// Accurate height breakdown (all px at 1440px canvas):
// Hero section:          665
// Grid top padding:       54
// 9 rows × (247 img + 18 mt-title + 24 title + 12 mt-text + 60 text) = 9 × 361 = 3249
// 8 row gaps × 72:       576
// Grid bottom padding:    54
// Grid total:           3933
// Cards section pt-18:    18
// Cards height:          520
// Cards pb-80:            80
// Cards total:           618
// Footer height:         477
const heroHeight   = 665;
const gridHeight   = 54 + (9 * 361) + (8 * 72) + 54; // 3933
const cardsHeight  = 18 + 520 + 80;                   // 618
const footerHeight = 477;

const footerTop   = heroHeight + gridHeight + cardsHeight; // 5216
const customHeight = footerTop + footerHeight;             // 5693

export default function IngredientsPage() {
  return (
    <>
      {/* Mobile view */}
      <div className="xl:hidden bg-anna-background text-anna-foreground pt-[140px]">
        <main className="flex flex-col w-full">
          {/* Hero — fluid width */}
          <div className="relative h-[280px] w-full overflow-hidden">
            <Image
              src="/ingredients-images/image 34.png"
              alt="Oil bubbles in water"
              fill
              priority
              className="object-cover object-bottom"
              sizes="100vw"
            />

            <div className="absolute left-5 bottom-6 z-10 flex flex-col items-start text-anna-foreground">
              <h1>
                <span className="block font-serif text-[42px] font-normal leading-[0.78]">
                  Our
                </span>
                <span className="block font-script text-[48px] font-normal leading-[0.72] mt-1">
                  Ingredients
                </span>
              </h1>
              <p className="mt-3 font-sans text-xs font-bold leading-tight text-anna-foreground max-w-[240px]">
                Discover the key ingredients that make our products truly transformative.
              </p>
            </div>
          </div>

          {/* Ingredients grid — 2 responsive columns */}
          <section className="grid grid-cols-2 gap-x-4 gap-y-8 px-5 py-8 justify-items-center">
            {ingredients.map((ingredient) => (
              <article key={ingredient.name} className="w-full">
                <div className="relative aspect-square w-full overflow-hidden rounded-[8px]">
                  <Image
                    src={ingredient.src}
                    alt={ingredient.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 251px"
                  />
                </div>
                <h2 className="mt-3 font-display text-base font-normal leading-tight text-anna-foreground min-h-[3rem]">
                  {ingredient.name}
                </h2>
                <p className="mt-1 font-sans text-xs font-normal leading-snug text-anna-foreground/80">
                  {ingredient.text.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </section>

          {/* Nav cards — full width, stacked */}
          <section className="flex flex-col gap-6 px-5 pb-12">
            <Link
              href="/brand"
              className="relative aspect-[520/380] w-full overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity bg-anna-cream"
            >
              <Image
                src="/brand-images/image 35.png"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute bottom-4 left-4 flex h-9 px-4 items-center justify-center rounded-md border border-white/85 bg-white/5">
                <span className="font-display text-2xl font-normal leading-none text-white">
                  About us
                </span>
              </div>
            </Link>

            <Link
              href="/values"
              className="relative aspect-[520/380] w-full overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity bg-anna-cream"
            >
              <Image
                src="/brand-images/Rectangle 32.png"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute bottom-4 left-4 flex h-9 px-4 items-center justify-center rounded-md border border-white/85 bg-white/5">
                <span className="font-display text-2xl font-normal leading-none text-white">
                  Values
                </span>
              </div>
            </Link>
          </section>
        </main>
        
        {/* standard mobile footer */}
        <MobileFooter />
      </div>

      {/* Desktop view */}
      <div className="hidden xl:block bg-anna-background">
        <FigmaScaler customHeight={customHeight}>
          <main
            className="relative bg-anna-background"
            style={{
              width: FIGMA_HOME.width,
              height: customHeight,
            }}
          >
            <section className="mx-auto w-full max-w-site">

              {/* Hero — full width */}
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

              {/* Ingredients grid — 3 equal columns, full width */}
              <section className="grid grid-cols-3 justify-items-center gap-x-[104px] gap-y-[72px] px-[70px] py-[54px]">
                {ingredients.map((ingredient) => (
                  <article key={ingredient.name} className="w-full max-w-[251px]">
                    <div className="relative h-[247px] w-full overflow-hidden rounded-[8px]">
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

              {/* Nav cards — full width two-column */}
              <section className="grid grid-cols-2 gap-[68px] px-[56px] pt-[18px] pb-[80px]">
                <Link
                  href="/brand"
                  className="relative h-[520px] w-full overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity"
                >
                  <Image
                    src="/brand-images/image 35.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-[22px] left-[22px] flex h-[54px] w-[187px] items-center justify-center rounded-[6px] border border-white/85 bg-white/5">
                    <span className="font-display text-[38px] font-normal leading-none text-white">
                      About us
                    </span>
                  </div>
                </Link>

                <Link
                  href="/values"
                  className="relative h-[520px] w-full overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity"
                >
                  <Image
                    src="/brand-images/Rectangle 32.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-[22px] left-[22px] flex h-[54px] w-[180px] items-center justify-center rounded-[6px] border border-white/85 bg-white/5">
                    <span className="font-display text-[38px] font-normal leading-none text-white">
                      Values
                    </span>
                  </div>
                </Link>
              </section>

            </section>

            {/* Footer — absolutely positioned after all content */}
            <FooterSection style={{ top: footerTop }} />
          </main>
        </FigmaScaler>
      </div>
    </>
  );
}