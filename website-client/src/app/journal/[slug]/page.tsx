import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { journalArticles } from "@/lib/journal-articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(journalArticles).map((slug) => ({ slug }));
}

// Estimate rendered height of a text block at 15px/1.8 line-height in a 632px column
// 632px column (680 - 48px padding), ~10.5 chars per line at 15px
function sectionHeight(heading: string, body: string): number {
  const colWidth = 632;
  const charsPerLine = Math.floor(colWidth / 8.5); // ~74 chars
  const headingLines = Math.ceil(heading.length / charsPerLine);
  const bodyLines = Math.ceil(body.length / charsPerLine);
  const headingH = headingLines * 22 + 12; // font size ~17px * 1.3 + mb-[12px]
  const bodyH = bodyLines * 27;            // 15px * 1.8 = 27px per line
  return headingH + bodyH;
}

export default async function JournalSinglePage({ params }: Props) {
  const { slug } = await params;
  const article = journalArticles[slug];

  if (!article) notFound();

  const s0H = sectionHeight(article.sections[0].heading, article.sections[0].body);
  const s1H = sectionHeight(article.sections[1].heading, article.sections[1].body);
  const s2H = article.sections[2]
    ? sectionHeight(article.sections[2].heading, article.sections[2].body)
    : 0;

  // Title: centered, 48px font, 1.2 leading, ~26 chars per line at 1440px
  const titleLines = Math.ceil(article.title.length / 26);
  const titleH = titleLines * 58; // 48px * 1.2

  // Read More card: aspect-[4/3] at (maxSiteWidth - 100px padding - 2*32px gap) / 3
  const readMoreImgW = (1340 - 64) / 3; // ~425
  const readMoreImgH = Math.round(readMoreImgW * 3 / 4); // ~319
  // title under: ~2 lines at 14px/1.5
  const readMoreCardH = readMoreImgH + 12 + 42;

  const footerTop =
    140 +          // pt-[140px]
    titleH +       // dynamic title
    40 +           // mt-[40px] before hero
    380 +          // hero image
    48 + s0H +     // mt + section 0
    36 + s1H +     // mt + section 1
    48 + 460 +     // mt + middle image
    (article.sections[2] ? 48 + s2H : 0) + // mt + section 2
    100 +          // mt-[100px] before Read More
    60 +           // Read More heading block
    40 +           // mb-[40px]
    readMoreCardH + // cards
    80;            // bottom breathing room

  const customHeight = footerTop + 477;

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
            {article.title}
          </h1>

          {/* Hero image */}
          <div className="relative mt-[40px] w-full h-[380px] overflow-hidden rounded-[10px]">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="680px"
            />
          </div>

          {/* First two text sections */}
          {article.sections.slice(0, 2).map((section, i) => (
            <div key={i} className={i === 0 ? "mt-[48px]" : "mt-[36px]"}>
              <h2 className="font-display text-[17px] font-bold leading-snug text-anna-foreground mb-[12px]">
                {section.heading}
              </h2>
              <p className="font-sans text-[15px] leading-[1.8] text-anna-foreground/80">
                {section.body}
              </p>
            </div>
          ))}

          {/* Middle wide image */}
          <div className="relative mt-[48px] w-full h-[460px] overflow-hidden rounded-[10px]">
            <Image
              src={article.middleImage}
              alt={`${article.title} — visual`}
              fill
              className="object-cover object-center"
              sizes="680px"
            />
          </div>

          {/* Third section */}
          {article.sections[2] && (
            <div className="mt-[48px]">
              <h2 className="font-display text-[17px] font-bold leading-snug text-anna-foreground mb-[12px]">
                {article.sections[2].heading}
              </h2>
              <p className="font-sans text-[15px] leading-[1.8] text-anna-foreground/80">
                {article.sections[2].body}
              </p>
            </div>
          )}
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
            {article.readMore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[8px] bg-anna-cream">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="420px"
                  />
                </div>
                <p className="mt-[12px] font-sans text-[14px] leading-[1.5] text-anna-foreground/80 group-hover:underline underline-offset-2 transition-all">
                  {item.title}
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