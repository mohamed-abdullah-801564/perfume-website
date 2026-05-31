import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";

const articles = [
  {
    src: "/smalljournal.png",
    alt: "Can traditional ingredients help achieve healthy glowing skin?",
    title: "Can traditional ingredients help achieve healthy glowing skin?",
    href: "/journal#traditional-ingredients-skin",
  },
  {
    src: "/smalljournal1.png",
    alt: "Why is rosemary oil trending in hair care?",
    title: "Why is rosemary oil trending in hair care?",
    href: "/journal#rosemary-oil-hair",
  },
  {
    src: "/smalljournal2.png",
    alt: "Can a health mix support daily energy levels?",
    title: "Can a health mix support daily energy levels?",
    href: "/journal#health-mix-energy",
  },
];

export default function JournalPage() {
  const customHeight = 3277;
  const footerTop = 2800;

  return (
    <FigmaScaler customHeight={customHeight}>
      <main
        className="relative bg-anna-background"
        style={{
          width: FIGMA_HOME.width,
          height: customHeight,
        }}
      >
        {/* All content centered in a narrow column */}
        <div className="mx-auto max-w-[680px] pt-[140px] px-[24px]">

          {/* Title — centered */}
          <h1 className="text-center font-display text-[48px] font-normal leading-[1.2] text-anna-foreground">
            Why are people returning
            <br />
            to traditional wellness?
          </h1>

          {/* Top small centered image */}
          <div className="relative mt-[40px] w-full h-[380px] overflow-hidden rounded-[10px]">
            <Image
              src="/litbigjournal.png"
              alt="Journal hero"
              fill
              priority
              className="object-cover"
              sizes="680px"
            />
          </div>

          {/* Text block 1 */}
          <div className="mt-[48px]">
            <h2 className="font-display text-[17px] font-bold leading-snug text-anna-foreground mb-[12px]">
              Growing Demand for Natural and Chemical-Free Living
            </h2>
            <p className="font-sans text-[15px] leading-[1.8] text-anna-foreground/80">
              In today&apos;s fast-paced world, more people are returning to
              traditional wellness practices as they seek natural and sustainable
              ways to improve their health. Traditional wellness focuses on
              holistic healing through ancient foods, herbal remedies, mindful
              living, and balanced nutrition. Unlike modern quick-fix solutions,
              traditional methods emphasize long-term wellness by supporting
              the body naturally. From herbal skincare to nutrient-rich traditional
              grains and Ayurvedic-inspired routines, people are increasingly
              choosing natural wellness products to maintain a healthier lifestyle
              without relying heavily on chemicals or processed alternatives.
            </p>
          </div>

          {/* Text block 2 */}
          <div className="mt-[36px]">
            <h2 className="font-display text-[17px] font-bold leading-snug text-anna-foreground mb-[12px]">
              Increased Awareness of Preventive Healthcare
            </h2>
            <p className="font-sans text-[15px] leading-[1.8] text-anna-foreground/80">
              One of the biggest reasons for the growing popularity of traditional
              wellness is the increasing awareness of the benefits of natural
              ingredients and preventive healthcare. Ancient superfoods like
              millets, black rice, herbal powders, and cold-pressed oils are rich
              in fiber, antioxidants, vitamins, and minerals that support immunity,
              digestion, skin health, and overall well-being. Consumers are
              becoming more conscious about what they eat and apply to their
              bodies, leading to a higher demand for organic health mixes,
              herbal beauty products, and traditional wellness solutions that are
              safe, effective, and deeply rooted in cultural wisdom.
            </p>
          </div>

          {/* Wide full-width image — breaks out of the narrow column */}
          <div className="relative mt-[48px] w-full h-[460px] overflow-hidden rounded-[10px]">
            <Image
              src="/middlejournal.png"
              alt="People enjoying traditional wellness outdoors"
              fill
              className="object-cover object-center"
              sizes="680px"
            />
          </div>

          {/* Text block 3 */}
          <div className="mt-[48px]">
            <h2 className="font-display text-[17px] font-bold leading-snug text-anna-foreground mb-[12px]">
              A Shift Towards Holistic and Balanced Lifestyles
            </h2>
            <p className="font-sans text-[15px] leading-[1.8] text-anna-foreground/80">
              Traditional wellness is also gaining attention because it promotes a
              balanced lifestyle that connects health, nature, and self-care. In an
              era dominated by stress, pollution, and unhealthy food habits,
              people are rediscovering the value of ancient wellness traditions
              that encourage mindful living and natural healing. Brands that offer
              authentic herbal products, traditional health foods, and Ayurvedic-
              inspired wellness solutions are becoming increasingly popular
              among health-conscious consumers. As people continue searching
              for natural ways to improve their physical and mental well-being,
              traditional wellness is no longer just a trend — it is becoming a
              lifestyle choice for healthier living.
            </p>
          </div>

        </div>

        {/* Read More — full width */}
        <div className="mx-auto w-full max-w-site px-[50px] mt-[100px]">
          <div className="flex items-baseline justify-between mb-[40px]">
            <h2 className="font-display text-[40px] font-normal text-anna-foreground">
              Read{" "}
              <span className="font-script text-[40px]">More</span>
            </h2>
            <Link
              href="/journal"
              className="font-sans text-[14px] text-anna-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              All articles
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-[32px]">
            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[8px] bg-anna-cream">
                  <Image
                    src={article.src}
                    alt={article.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="420px"
                  />
                </div>
                <p className="mt-[12px] font-sans text-[14px] leading-[1.5] text-anna-foreground/80 group-hover:underline underline-offset-2 transition-all">
                  {article.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <FooterSection style={{ top: footerTop }} />
      </main>
    </FigmaScaler>
  );
}