import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";

const BLOG_DATA = {
  "traditional-wellness": {
    title: "Why Are People Returning to Traditional Wellness?",
    image: "/journalall1.png",
    sections: [
      { h: "1. Growing Demand for Natural and Chemical-Free Living", b: "In today’s fast-paced world, more people are returning to traditional wellness practices as they seek natural and sustainable ways to improve their health. Traditional wellness focuses on holistic healing through ancient foods, herbal remedies, mindful living, and balanced nutrition. Unlike modern quick-fix solutions, traditional methods emphasize long-term wellness by supporting the body naturally. From herbal skincare to nutrient-rich traditional grains and Ayurvedic-inspired routines, people are increasingly choosing natural wellness products to maintain a healthier lifestyle without relying heavily on chemicals or processed alternatives." },
      { h: "2. Increased Awareness of Preventive Healthcare", b: "One of the biggest reasons for the growing popularity of traditional wellness is the increasing awareness of the benefits of natural ingredients and preventive healthcare. Ancient superfoods like millets, black rice, herbal powders, and cold-pressed oils are rich in fiber, antioxidants, vitamins, and minerals that support immunity, digestion, skin health, and overall well-being. Consumers are becoming more conscious about what they eat and apply to their bodies, leading to a higher demand for organic health mixes, herbal beauty products, and traditional wellness solutions that are safe, effective, and deeply rooted in cultural wisdom." },
      { h: "3. A Shift Towards Holistic and Balanced Lifestyles", b: "Traditional wellness is also gaining attention because it promotes a balanced lifestyle that connects health, nature, and self-care. In an era dominated by stress, pollution, and unhealthy food habits, people are rediscovering the value of ancient wellness traditions that encourage mindful living and natural healing. Brands that offer authentic herbal products, traditional health foods, and Ayurvedic-inspired wellness solutions are becoming increasingly popular among health-conscious consumers. As people continue searching for natural ways to improve their physical and mental well-being, traditional wellness is no longer just a trend—it is becoming a lifestyle choice for healthier living." }
    ]
  },
  "traditional-ingredients-skin": {
    title: "Can Traditional Ingredients Help Achieve Naturally Glowing Skin?",
    image: "/journalall2.png",
    sections: [
      { h: "1. The Power of Natural Herbal Skincare", b: "Traditional ingredients have been used for centuries in herbal skincare and natural beauty routines to support healthy, glowing skin. Ancient herbs, flowers, and plant-based ingredients are rich in natural nutrients that help cleanse, nourish, and refresh the skin without harsh chemicals. Ingredients like aloe vera, rose petals, tulsi, and avaram poo are widely known in traditional wellness practices for their soothing and skin-enhancing properties. As more people move towards chemical-free skincare, traditional beauty remedies are becoming increasingly popular for achieving naturally radiant skin." },
      { h: "2. Traditional Ingredients Support Healthy Skin Naturally", b: "One of the biggest benefits of traditional skincare ingredients is their ability to support skin health gently and naturally. Herbal ingredients are often rich in antioxidants, vitamins, and antibacterial properties that help reduce dullness, improve skin texture, and maintain a healthy glow. Natural ingredients like aloe vera help hydrate the skin, while tulsi and kuppaimeni help cleanse impurities and excess oil. Rose petals and herbal flowers are traditionally used to refresh tired skin and promote a brighter, smoother appearance, making herbal face packs a trusted part of natural skincare routines." },
      { h: "3. A Holistic Approach to Long-Term Skin Wellness", b: "Traditional wellness focuses not only on outer beauty but also on long-term skin health through holistic care and natural living. Unlike chemical-based products that may provide temporary results, traditional skincare supports balanced and healthy skin over time. With growing awareness about clean beauty and herbal wellness, many people are choosing Ayurvedic-inspired skincare products and natural face packs as part of their daily self-care routine. By combining traditional ingredients with healthy lifestyle habits, it is possible to achieve naturally glowing skin while maintaining overall skin wellness in a safe and sustainable way." }
    ]
  },
  "rosemary-oil-hair": {
    title: "Why Is Rosemary Oil Trending in Hair Care?",
    image: "/journalall3.png",
    sections: [
      { h: "1. Natural Hair Growth Solutions Are Gaining Popularity", b: "Rosemary oil has become one of the most popular natural hair care ingredients as people increasingly look for chemical-free ways to support healthy hair growth. Known for its traditional herbal benefits, rosemary oil is believed to help improve blood circulation to the scalp, which may support stronger and healthier hair. With growing awareness about clean beauty and herbal wellness, many consumers are replacing harsh hair products with natural oils and plant-based remedies. This shift has made rosemary hair oil a trending choice in modern hair care routines." },
      { h: "2. Supports Hair Strength, Thickness, and Scalp Health", b: "One of the main reasons rosemary oil is trending is because of its potential benefits for overall scalp and hair health. Rosemary oil is commonly used to help reduce hair fall, nourish hair roots, and improve hair thickness naturally. When combined with traditional ingredients like coconut oil, curry leaves, fenugreek, amla, and hibiscus, it creates a powerful herbal blend that supports healthy-looking hair. Many people also use rosemary oil to help control dandruff, dryness, and scalp irritation while maintaining soft and manageable hair." },
      { h: "3. Social Media and Herbal Beauty Trends Increased Its Demand", b: "The popularity of rosemary oil has grown rapidly due to social media beauty trends, influencer recommendations, and increasing interest in Ayurvedic and herbal hair care solutions. Consumers are now more aware of the long-term benefits of natural ingredients compared to chemical-based hair products. As a result, rosemary oil has become a preferred option for people seeking healthier, shinier, and naturally nourished hair. Its combination of traditional wellness benefits and modern beauty appeal has made rosemary oil one of the biggest trends in natural hair care today." }
    ]
  },
  "health-mix-vs-processed": {
    title: "Why Is a Traditional Health Mix Better Than Processed Breakfast Drinks?",
    image: "/journalall4.png",
    sections: [
      { h: "1. Made with Natural and Nutrient-Rich Ingredients", b: "Traditional health mixes are prepared using wholesome ingredients like millets, traditional rice varieties, pulses, nuts, and natural grains that are rich in fiber, protein, vitamins, and minerals. Unlike many processed breakfast drinks that may contain artificial flavors, refined sugar, preservatives, and synthetic additives, traditional health mixes focus on natural nutrition. Ingredients such as ragi, barley, black rice, and green gram provide sustained energy and nourishment while supporting overall wellness naturally." },
      { h: "2. Supports Better Digestion and Long-Lasting Energy", b: "One of the biggest advantages of traditional health mixes is their high fiber content, which helps improve digestion and keeps you feeling fuller for longer periods. Processed breakfast drinks often provide temporary energy due to added sugars and refined ingredients, which may lead to energy crashes later in the day. Traditional multigrain and millet-based health mixes release energy slowly, helping support metabolism, healthy weight management, and balanced nutrition throughout the day." },
      { h: "3. A Healthier Choice for Modern Lifestyles", b: "As people become more health-conscious, there is a growing shift towards clean eating and natural wellness. Traditional health mixes are valued because they are rooted in ancient food wisdom and prepared with minimal processing. They support a holistic lifestyle by providing natural nourishment without unnecessary chemicals or artificial ingredients. Whether consumed as a healthy breakfast or daily nutritional supplement, traditional health mixes offer a more balanced and sustainable alternative to heavily processed breakfast drinks." }
    ]
  },
  "health-mix-energy": {
    title: "Can a Health Mix Support Daily Energy Naturally?",
    image: "/journalall5.png",
    sections: [
      { h: "1. Traditional Ingredients Provide Sustained Energy", b: "A traditional health mix can naturally support daily energy levels because it is made with nutrient-rich ingredients like millets, traditional rice varieties, pulses, nuts, and grains. Ingredients such as ragi, barley, black rice, and green gram are rich in complex carbohydrates, protein, iron, and fiber that help provide steady energy throughout the day. Unlike sugary processed foods that cause sudden energy spikes and crashes, traditional health mixes release energy slowly and help maintain overall stamina naturally." },
      { h: "2. Rich in Essential Nutrients for Everyday Wellness", b: "Health mixes made from natural grains and legumes are packed with vitamins, minerals, antioxidants, and plant-based protein that help nourish the body and support daily activities. Ingredients like almonds, horse gram, and black gram help strengthen the body, while millets and traditional rice varieties support better digestion and metabolism. These nutrient-dense foods help keep the body active, improve focus, and support overall wellness when included as part of a balanced diet." },
      { h: "3. A Healthy Alternative for Busy Modern Lifestyles", b: "In today’s fast-paced lifestyle, many people look for healthy and convenient breakfast options that provide long-lasting nourishment. Traditional health mixes are easy to prepare, filling, and suitable for all age groups, making them an ideal daily nutrition choice. Since they are usually free from artificial additives and heavily processed ingredients, they support natural wellness while helping maintain energy levels throughout the day. Regular consumption of a wholesome health mix, along with healthy lifestyle habits, can help promote better vitality and balanced nutrition naturally." }
    ]
  },
  "kavuni-kanji-weight": {
    title: "Can Karuppu Kavuni Kanji Support Weight Management?",
    image: "/journalall6.png",
    sections: [
      { h: "1. Rich in Fiber and Traditional Nutrition", b: "Karuppu Kavuni Kanji is made using traditional ingredients like Karuppu Kavuni rice, millets, and horse gram, which are naturally rich in dietary fiber and essential nutrients. Fiber-rich foods help keep you fuller for a longer time, which may help reduce unnecessary snacking and overeating. Unlike heavily processed breakfast options, this traditional health mix provides wholesome nourishment while supporting a balanced and healthy diet naturally." },
      { h: "2. Supports Better Digestion and Metabolism", b: "Traditional grains such as Karuppu Kavuni rice, Samai (Little Millet), and Kollu (Horse Gram) are valued for their digestive and metabolism-supporting properties. These ingredients are commonly included in traditional wellness diets because they may help improve gut health and support natural body balance. Horse gram, in particular, is widely known in traditional food practices for supporting healthy weight management when consumed regularly as part of a healthy lifestyle." },
      { h: "3. A Healthy and Filling Breakfast Choice", b: "Karuppu Kavuni Kanji can be a healthy breakfast option for people looking to maintain an active and balanced lifestyle. Since it provides sustained energy and helps keep the stomach satisfied for longer durations, it may help reduce cravings for unhealthy foods during the day. Combined with regular exercise and healthy eating habits, traditional kanji mixes can support natural wellness and healthy weight management in a simple and nourishing way." }
    ]
  },
  "kanji-wellness-meal": {
    title: "Can a Simple Kanji Become a Complete Wellness Meal?",
    image: "/journalall7.png",
    sections: [
      { h: "1. Traditional Kanji Is Packed with Natural Nutrition", b: "A simple kanji can become a complete wellness meal when prepared using traditional ingredients like Karuppu Kavuni rice, millets, pulses, and natural grains. These ingredients are rich in fiber, protein, iron, and essential nutrients that help nourish the body naturally. Traditional kanji recipes have been followed for generations because they provide balanced nutrition while remaining light, wholesome, and easy to digest. Unlike processed meals, kanji supports natural wellness through simple and clean ingredients." },
      { h: "2. Supports Energy, Digestion, and Daily Wellness", b: "Kanji is more than just a comfort food—it can support daily energy and overall well-being when consumed regularly as part of a healthy lifestyle. Fiber-rich ingredients help improve digestion and keep you feeling fuller for longer durations, while nutrient-dense grains and legumes provide steady energy throughout the day. Traditional wellness foods like kanji are also valued for their ability to support metabolism, gut health, and healthy eating habits naturally." },
      { h: "3. A Healthy Choice for Modern Lifestyles", b: "In today’s busy lifestyle, many people are turning back to traditional wellness meals that are simple, nourishing, and easy to prepare. A wholesome kanji made from ancient grains and natural ingredients can serve as a healthy breakfast or light meal suitable for all age groups. Free from excessive processing and artificial additives, traditional kanji combines convenience with balanced nutrition, making it an ideal choice for people seeking natural wellness and healthier everyday eating habits." }
    ]
  },
  "black-rice-antioxidants": {
    title: "How Do Antioxidants in Black Rice Benefit the Body?",
    image: "/journalall8.png",
    sections: [
      { h: "1. Rich Source of Powerful Natural Antioxidants", b: "Black rice, especially traditional varieties like Karuppu Kavuni rice, is naturally rich in antioxidants that help protect the body from harmful free radicals. The deep black and purple color of the rice comes from anthocyanins, the same antioxidant compounds found in berries and other superfoods. These antioxidants help support overall wellness by reducing oxidative stress and promoting healthier body functions naturally." },
      { h: "2. Supports Immunity, Heart Health, and Healthy Aging", b: "The antioxidants present in black rice may help strengthen the body’s natural immunity and support overall health. Traditional black rice is also valued for supporting heart wellness by helping maintain healthy cholesterol levels when included as part of a balanced diet. Antioxidants can also help slow signs of premature aging by protecting skin cells and body tissues from environmental damage, making black rice a beneficial addition to a healthy lifestyle." },
      { h: "3. Promotes Better Digestion and Natural Energy", b: "Black rice is not only rich in antioxidants but also contains fiber, iron, and essential nutrients that support digestion and sustained energy. Fiber helps improve gut health and keeps you feeling fuller for longer, while iron supports healthy blood circulation and energy levels. As more people move towards natural wellness and traditional superfoods, black rice is becoming a popular choice for those seeking nutrient-rich foods that support long-term health naturally." }
    ]
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BLOG_DATA).map((slug) => ({ slug }));
}

export default async function JournalSinglePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_DATA[slug as keyof typeof BLOG_DATA];

  if (!post) notFound();

  const customHeight = 3280;
  const footerTop = 2800;

  // Filter out the current active slug to show 3 other articles for the "Read More" section
  const otherPosts = Object.entries(BLOG_DATA)
    .filter(([key]) => key !== slug)
    .slice(0, 3)
    .map(([key, item]) => ({
      slug: key,
      title: item.title,
      image: item.image,
      href: `/journal/${key}`
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
            {post.title}
          </h1>

          {/* Top small centered image */}
          <div className="relative mt-[40px] w-full h-[380px] overflow-hidden rounded-[10px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="680px"
            />
          </div>

          {/* Text block 1 */}
          <div className="mt-[48px]">
            <h2 className="font-sans text-[20px] font-semibold tracking-wide text-anna-foreground mb-[14px] mt-[40px]">
              {post.sections[0].h}
            </h2>
            <p className="font-sans text-[17px] font-normal leading-[1.65] text-[#222222] text-justify tracking-normal mb-[24px]">
              {post.sections[0].b}
            </p>
          </div>

          {/* Text block 2 */}
          <div className="mt-[36px]">
            <h2 className="font-sans text-[20px] font-semibold tracking-wide text-anna-foreground mb-[14px] mt-[40px]">
              {post.sections[1].h}
            </h2>
            <p className="font-sans text-[17px] font-normal leading-[1.65] text-[#222222] text-justify tracking-normal mb-[24px]">
              {post.sections[1].b}
            </p>
          </div>

          {/* Wide full-width image — breaks out of the narrow column */}
          <div className="relative mt-[48px] w-full h-[460px] overflow-hidden rounded-[10px]">
            <Image
              src="/middlejournal.png"
              alt="Middle visual"
              fill
              className="object-cover object-center"
              sizes="680px"
            />
          </div>

          {/* Text block 3 */}
          <div className="mt-[48px]">
            <h2 className="font-sans text-[20px] font-semibold tracking-wide text-anna-foreground mb-[14px] mt-[40px]">
              {post.sections[2].h}
            </h2>
            <p className="font-sans text-[17px] font-normal leading-[1.65] text-[#222222] text-justify tracking-normal mb-[24px]">
              {post.sections[2].b}
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
              href="/articles"
              className="font-sans text-[14px] text-anna-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              All articles
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-[32px]">
            {otherPosts.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[8px] bg-anna-cream">
                  <Image
                    src={item.image}
                    alt={item.title}
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