"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";

const JOURNAL_POSTS = {
  'traditional-wellness': {
    title: "Why are people returning to traditional wellness?",
    image: "/litbigjournal.png",
    alt: "Journal hero",
    paragraphs: [
      {
        heading: "1. Growing Demand for Natural and Chemical-Free Living",
        text: "In today’s fast-paced world, more people are returning to traditional wellness practices as they seek natural and sustainable ways to improve their health. Traditional wellness focuses on holistic healing through ancient foods, herbal remedies, mindful living, and balanced nutrition. Unlike modern quick-fix solutions, traditional methods emphasize long-term wellness by supporting the body naturally. From herbal skincare to nutrient-rich traditional grains and Ayurvedic-inspired routines, people are increasingly choosing natural wellness products to maintain a healthier lifestyle without relying heavily on chemicals or processed alternatives."
      },
      {
        heading: "2. Increased Awareness of Preventive Healthcare",
        text: "One of the biggest reasons for the growing popularity of traditional wellness is the increasing awareness of the benefits of natural ingredients and preventive healthcare. Ancient superfoods like millets, black rice, herbal powders, and cold-pressed oils are rich in fiber, antioxidants, vitamins, and minerals that support immunity, digestion, skin health, and overall well-being. Consumers are becoming more conscious about what they eat and apply to their bodies, leading to a higher demand for organic health mixes, herbal beauty products, and traditional wellness solutions that are safe, effective, and deeply rooted in cultural wisdom."
      },
      {
        heading: "3. A Shift Towards Holistic and Balanced Lifestyles",
        text: "Traditional wellness is also gaining attention because it promotes a balanced lifestyle that connects health, nature, and self-care. In an era dominated by stress, pollution, and unhealthy food habits, people are rediscovering the value of ancient wellness traditions that encourage mindful living and natural healing. Brands that offer authentic herbal products, traditional health foods, and Ayurvedic-inspired wellness solutions are becoming increasingly popular among health-conscious consumers. As people continue searching for natural ways to improve their physical and mental well-being, traditional wellness is no longer just a trend—it is becoming a lifestyle choice for healthier living."
      }
    ]
  },
  'glowing-skin': {
    title: "Can Traditional Ingredients Help Achieve Naturally Glowing Skin?",
    image: "/smalljournal.png",
    alt: "Can traditional ingredients help achieve healthy glowing skin?",
    paragraphs: [
      {
        heading: "1. The Power of Natural Herbal Skincare",
        text: "Traditional ingredients have been used for centuries in herbal skincare and natural beauty routines to support healthy, glowing skin. Ancient herbs, flowers, and plant-based ingredients are rich in natural nutrients that help cleanse, nourish, and refresh the skin without harsh chemicals. Ingredients like aloe vera, rose petals, tulsi, and avaram poo are widely known in traditional wellness practices for their soothing and skin-enhancing properties. As more people move towards chemical-free skincare, traditional beauty remedies are becoming increasingly popular for achieving naturally radiant skin."
      },
      {
        heading: "2. Traditional Ingredients Support Healthy Skin Naturally",
        text: "One of the biggest benefits of traditional skincare ingredients is their ability to support skin health gently and naturally. Herbal ingredients are often rich in antioxidants, vitamins, and antibacterial properties that help reduce dullness, improve skin texture, and maintain a healthy glow. Natural ingredients like aloe vera help hydrate the skin, while tulsi and kuppaimeni help cleanse impurities and excess oil. Rose petals and herbal flowers are traditionally used to refresh tired skin and promote a brighter, smoother appearance, making herbal face packs a trusted part of natural skincare routines."
      },
      {
        heading: "3. A Holistic Approach to Long-Term Skin Wellness",
        text: "Traditional wellness focuses not only on outer beauty but also on long-term skin health through holistic care and natural living. Unlike chemical-based products that may provide temporary results, traditional skincare supports balanced and healthy skin over time. With growing awareness about clean beauty and herbal wellness, many people are choosing Ayurvedic-inspired skincare products and natural face packs as part of their daily self-care routine. By combining traditional ingredients with healthy lifestyle habits, it is possible to achieve naturally glowing skin while maintaining overall skin wellness in a safe and sustainable way."
      }
    ]
  },
  'rosemary-hair': {
    title: "Why Is Rosemary Oil Trending in Hair Care?",
    image: "/smalljournal1.png",
    alt: "Why is rosemary oil trending in hair care?",
    paragraphs: [
      {
        heading: "1. Natural Hair Growth Solutions Are Gaining Popularity",
        text: "Rosemary oil has become one of the most popular natural hair care ingredients as people increasingly look for chemical-free ways to support healthy hair growth. Known for its traditional herbal benefits, rosemary oil is believed to help improve blood circulation to the scalp, which may support stronger and healthier hair. With growing awareness about clean beauty and herbal wellness, many consumers are replacing harsh hair products with natural oils and plant-based remedies. This shift has made rosemary hair oil a trending choice in modern hair care routines."
      },
      {
        heading: "2. Supports Hair Strength, Thickness, and Scalp Health",
        text: "One of the main reasons rosemary oil is trending is because of its potential benefits for overall scalp and hair health. Rosemary oil is commonly used to help reduce hair fall, nourish hair roots, and improve hair thickness naturally. When combined with traditional ingredients like coconut oil, curry leaves, fenugreek, amla, and hibiscus, it creates a powerful herbal blend that supports healthy-looking hair. Many people also use rosemary oil to help control dandruff, dryness, and scalp irritation while maintaining soft and manageable hair."
      },
      {
        heading: "3. Social Media and Herbal Beauty Trends Increased Its Demand",
        text: "The popularity of rosemary oil has grown rapidly due to social media beauty trends, influencer recommendations, and increasing interest in Ayurvedic and herbal hair care solutions. Consumers are now more aware of the long-term benefits of natural ingredients compared to chemical-based hair products. As a result, rosemary oil has become a preferred option for people seeking healthier, shinier, and naturally nourished hair. Its combination of traditional wellness benefits and modern beauty appeal has made rosemary oil one of the biggest trends in natural hair care today."
      }
    ]
  },
  'health-mix-energy': {
    title: "Can a Health Mix Support Daily Energy Naturally?",
    image: "/smalljournal2.png",
    alt: "Can a health mix support daily energy levels?",
    paragraphs: [
      {
        heading: "1. Traditional Ingredients Provide Sustained Energy",
        text: "A traditional health mix can naturally support daily energy levels because it is made with nutrient-rich ingredients like millets, traditional rice varieties, pulses, nuts, and grains. Ingredients such as ragi, barley, black rice, and green gram are rich in complex carbohydrates, protein, iron, and fiber that help provide steady energy throughout the day. Unlike sugary processed foods that cause sudden energy spikes and crashes, traditional health mixes release energy slowly and help maintain overall stamina naturally."
      },
      {
        heading: "2. Rich in Essential Nutrients for Everyday Wellness",
        text: "Health mixes made from natural grains and legumes are packed with vitamins, minerals, antioxidants, and plant-based protein that help nourish the body and support daily activities. Ingredients like almonds, horse gram, and black gram help strengthen the body, while millets and traditional rice varieties support better digestion and metabolism. These nutrient-dense foods help keep the body active, improve focus, and support overall wellness when included as part of a balanced diet."
      },
      {
        heading: "3. A Healthy Alternative for Busy Modern Lifestyles",
        text: "In today’s fast-paced lifestyle, many people look for healthy and convenient breakfast options that provide long-lasting nourishment. Traditional health mixes are easy to prepare, filling, and suitable for all age groups, making them an ideal daily nutrition choice. Since they are usually free from artificial additives and processed ingredients, they support natural wellness while helping maintain energy levels throughout the day. Regular consumption of a wholesome health mix, along with healthy lifestyle habits, can help promote better vitality and balanced nutrition naturally."
      }
    ]
  }
};

export default function JournalPage() {
  const [activeSlug, setActiveSlug] = useState<string>('traditional-wellness');
  const customHeight = 3280;
  const footerTop = 2800;

  const currentPost = JOURNAL_POSTS[activeSlug as keyof typeof JOURNAL_POSTS] || JOURNAL_POSTS['traditional-wellness'];

  const otherPosts = Object.entries(JOURNAL_POSTS)
    .filter(([key]) => key !== activeSlug)
    .map(([slug, post]) => ({
      slug,
      src: post.image,
      alt: post.alt,
      title: post.title,
    }));

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
          <h1 className="font-sans text-[40px] font-normal leading-[1.0] text-center text-anna-foreground">
            {currentPost.title}
          </h1>

          {/* Top small centered image */}
          <div className="relative mt-[40px] w-full h-[380px] overflow-hidden rounded-[10px]">
            <Image
              src={currentPost.image}
              alt={currentPost.alt}
              fill
              priority
              className="object-cover"
              sizes="680px"
            />
          </div>

          {/* Text block 1 */}
          <div className="mt-[48px]">
            <h2 className="font-sans text-[20px] font-semibold tracking-wide text-anna-foreground mb-[14px] mt-[40px]">
              {currentPost.paragraphs[0].heading}
            </h2>
            <p className="font-sans text-[17px] font-normal leading-[1.65] text-[#222222] text-justify tracking-normal mb-[24px]">
              {currentPost.paragraphs[0].text}
            </p>
          </div>

          {/* Text block 2 */}
          <div className="mt-[36px]">
            <h2 className="font-sans text-[20px] font-semibold tracking-wide text-anna-foreground mb-[14px] mt-[40px]">
              {currentPost.paragraphs[1].heading}
            </h2>
            <p className="font-sans text-[17px] font-normal leading-[1.65] text-[#222222] text-justify tracking-normal mb-[24px]">
              {currentPost.paragraphs[1].text}
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
            <h2 className="font-sans text-[20px] font-semibold tracking-wide text-anna-foreground mb-[14px] mt-[40px]">
              {currentPost.paragraphs[2].heading}
            </h2>
            <p className="font-sans text-[17px] font-normal leading-[1.65] text-[#222222] text-justify tracking-normal mb-[24px]">
              {currentPost.paragraphs[2].text}
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
            {otherPosts.map((article) => (
              <button
                key={article.slug}
                onClick={() => {
                  setActiveSlug(article.slug);
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group flex flex-col text-left w-full cursor-pointer"
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
              </button>
            ))}
          </div>
        </div>

        <FooterSection style={{ top: footerTop }} />
      </main>
    </FigmaScaler>
  );
}