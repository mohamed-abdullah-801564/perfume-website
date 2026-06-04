import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";

const articles = [
  {
    src: "/journalall1.png",
    title: "Why are people returning to traditional wellness?",
    href: "/journal/traditional-wellness",
  },
  {
    src: "/journalall2.png",
    title: "Can traditional ingredients help achieve naturally glowing skin?",
    href: "/journal/traditional-ingredients-skin",
  },
  {
    src: "/journalall3.png",
    title: "Why is rosemary oil trending in hair care?",
    href: "/journal/rosemary-oil-hair",
  },
  {
    src: "/journalall4.png",
    title: "Why is a traditional health mix better than processed breakfast drinks?",
    href: "/journal/health-mix-vs-processed",
  },
  {
    src: "/journalall5.png",
    title: "Can a health mix support daily energy naturally?",
    href: "/journal/health-mix-energy",
  },
  {
    src: "/journalall6.png",
    title: "Can Karuppu Kavuni kanji support weight management?",
    href: "/journal/kavuni-kanji-weight",
  },
  {
    src: "/journalall7.png",
    title: "Can a simple kanji become a complete wellness meal?",
    href: "/journal/kanji-wellness-meal",
  },
  {
    src: "/journalall8.png",
    title: "How do antioxidants in black rice benefit the body?",
    href: "/journal/black-rice-antioxidants",
  },
];

export default function ArticlesPage() {
  const colW = (1340 - 56) / 3;
  const imgH = Math.round(colW * 3 / 4);
  const cardH = imgH + 14 + 42 + 8 + 20;
  const gridH = 3 * cardH + 2 * 60;

  const footerTop = 100 + 120 + 60 + gridH + 80;
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
        <div className="mx-auto max-w-site px-[50px] pt-[100px]">
          <h1 className="font-display text-[42px] font-normal leading-[1.2] text-anna-foreground">
            <span className="font-script text-[48px]">Explore</span>{" "}
            our insights,
            <br />
            tutorials,{" "}
            <span className="font-script text-[42px]">and articles.</span>
          </h1>
        </div>

        <div className="mx-auto max-w-site px-[50px] mt-[60px]">
          <div className="grid grid-cols-3 gap-x-[28px] gap-y-[60px]">
            {articles.map((article) => (
              <div key={article.href} className="flex flex-col">
                <Link href={article.href} className="group block">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[10px] bg-anna-cream">
                    <Image
                      src={article.src}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="420px"
                    />
                  </div>
                </Link>
                <p className="mt-[14px] font-sans text-[14px] leading-[1.6] text-anna-foreground/80">
                  {article.title}
                </p>
                <Link
                  href={article.href}
                  className="mt-[8px] font-sans text-[13px] text-anna-foreground underline underline-offset-4 hover:opacity-60 transition-opacity w-fit"
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </div>

        <FooterSection style={{ top: footerTop }} />
      </main>
    </FigmaScaler>
  );
}