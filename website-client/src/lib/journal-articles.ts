export interface JournalArticle {
  slug: string;
  title: string;
  heroImage: string;
  middleImage: string;
  sections: {
    heading: string;
    body: string;
  }[];
  readMore: {
    src: string;
    alt: string;
    title: string;
    href: string;
  }[];
}

export const journalArticles: Record<string, JournalArticle> = {
  "traditional-wellness": {
    slug: "traditional-wellness",
    title: "Why are people returning to traditional wellness?",
    heroImage: "/litbigjournal.png",
    middleImage: "/middlejournal.png",
    sections: [
      {
        heading: "Growing Demand for Natural and Chemical-Free Living",
        body: "In today's fast-paced world, more people are returning to traditional wellness practices as they seek natural and sustainable ways to improve their health. Traditional wellness focuses on holistic healing through ancient foods, herbal remedies, mindful living, and balanced nutrition. Unlike modern quick-fix solutions, traditional methods emphasize long-term wellness by supporting the body naturally. From herbal skincare to nutrient-rich traditional grains and Ayurvedic-inspired routines, people are increasingly choosing natural wellness products to maintain a healthier lifestyle without relying heavily on chemicals or processed alternatives.",
      },
      {
        heading: "Increased Awareness of Preventive Healthcare",
        body: "One of the biggest reasons for the growing popularity of traditional wellness is the increasing awareness of the benefits of natural ingredients and preventive healthcare. Ancient superfoods like millets, black rice, herbal powders, and cold-pressed oils are rich in fiber, antioxidants, vitamins, and minerals that support immunity, digestion, skin health, and overall well-being. Consumers are becoming more conscious about what they eat and apply to their bodies, leading to a higher demand for organic health mixes, herbal beauty products, and traditional wellness solutions that are safe, effective, and deeply rooted in cultural wisdom.",
      },
      {
        heading: "A Shift Towards Holistic and Balanced Lifestyles",
        body: "Traditional wellness is also gaining attention because it promotes a balanced lifestyle that connects health, nature, and self-care. In an era dominated by stress, pollution, and unhealthy food habits, people are rediscovering the value of ancient wellness traditions that encourage mindful living and natural healing. Brands that offer authentic herbal products, traditional health foods, and Ayurvedic-inspired wellness solutions are becoming increasingly popular among health-conscious consumers. As people continue searching for natural ways to improve their physical and mental well-being, traditional wellness is no longer just a trend—it is becoming a lifestyle choice for healthier living.",
      },
    ],
    readMore: [
      {
        src: "/smalljournal.png",
        alt: "Can traditional ingredients help achieve naturally glowing skin?",
        title: "Can traditional ingredients help achieve naturally glowing skin?",
        href: "/journal/traditional-ingredients-skin",
      },
      {
        src: "/smalljournal1.png",
        alt: "Why is rosemary oil trending in hair care?",
        title: "Why is rosemary oil trending in hair care?",
        href: "/journal/rosemary-oil-hair",
      },
      {
        src: "/smalljournal2.png",
        alt: "Can a health mix support daily energy naturally?",
        title: "Can a health mix support daily energy naturally?",
        href: "/journal/health-mix-energy",
      },
    ],
  },

  "traditional-ingredients-skin": {
    slug: "traditional-ingredients-skin",
    title: "Can traditional ingredients help achieve naturally glowing skin?",
    heroImage: "/litbigjournal.png",
    middleImage: "/middlejournal.png",
    sections: [
      {
        heading: "The Power of Natural Herbal Skincare",
        body: "Traditional ingredients have been used for centuries in herbal skincare and natural beauty routines to support healthy, glowing skin. Ancient herbs, flowers, and plant-based ingredients are rich in natural nutrients that help cleanse, nourish, and refresh the skin without harsh chemicals. Ingredients like aloe vera, rose petals, tulsi, and avaram poo are widely known in traditional wellness practices for their soothing and skin-enhancing properties. As more people move towards chemical-free skincare, traditional beauty remedies are becoming increasingly popular for achieving naturally radiant skin.",
      },
      {
        heading: "Traditional Ingredients Support Healthy Skin Naturally",
        body: "One of the biggest benefits of traditional skincare ingredients is their ability to support skin health gently and naturally. Herbal ingredients are often rich in antioxidants, vitamins, and antibacterial properties that help reduce dullness, improve skin texture, and maintain a healthy glow. Natural ingredients like aloe vera help hydrate the skin, while tulsi and kuppaimeni help cleanse impurities and excess oil. Rose petals and herbal flowers are traditionally used to refresh tired skin and promote a brighter, smoother appearance, making herbal face packs a trusted part of natural skincare routines.",
      },
      {
        heading: "A Holistic Approach to Long-Term Skin Wellness",
        body: "Traditional wellness focuses not only on outer beauty but also on long-term skin health through holistic care and natural living. Unlike chemical-based products that may provide temporary results, traditional skincare supports balanced and healthy skin over time. With growing awareness about clean beauty and herbal wellness, many people are choosing Ayurvedic-inspired skincare products and natural face packs as part of their daily self-care routine. By combining traditional ingredients with healthy lifestyle habits, it is possible to achieve naturally glowing skin while maintaining overall skin wellness in a safe and sustainable way.",
      },
    ],
    readMore: [
      {
        src: "/smalljournal1.png",
        alt: "Why is rosemary oil trending in hair care?",
        title: "Why is rosemary oil trending in hair care?",
        href: "/journal/rosemary-oil-hair",
      },
      {
        src: "/smalljournal2.png",
        alt: "Can a health mix support daily energy naturally?",
        title: "Can a health mix support daily energy naturally?",
        href: "/journal/health-mix-energy",
      },
      {
        src: "/smalljournal.png",
        alt: "Why are people returning to traditional wellness?",
        title: "Why are people returning to traditional wellness?",
        href: "/journal/traditional-wellness",
      },
    ],
  },

  "rosemary-oil-hair": {
    slug: "rosemary-oil-hair",
    title: "Why is rosemary oil trending in hair care?",
    heroImage: "/litbigjournal.png",
    middleImage: "/middlejournal.png",
    sections: [
      {
        heading: "Natural Hair Growth Solutions Are Gaining Popularity",
        body: "Rosemary oil has become one of the most popular natural hair care ingredients as people increasingly look for chemical-free ways to support healthy hair growth. Known for its traditional herbal benefits, rosemary oil is believed to help improve blood circulation to the scalp, which may support stronger and healthier hair. With growing awareness about clean beauty and herbal wellness, many consumers are replacing harsh hair products with natural oils and plant-based remedies. This shift has made rosemary hair oil a trending choice in modern hair care routines.",
      },
      {
        heading: "Supports Hair Strength, Thickness, and Scalp Health",
        body: "One of the main reasons rosemary oil is trending is because of its potential benefits for overall scalp and hair health. Rosemary oil is commonly used to help reduce hair fall, nourish hair roots, and improve hair thickness naturally. When combined with traditional ingredients like coconut oil, curry leaves, fenugreek, amla, and hibiscus, it creates a powerful herbal blend that supports healthy-looking hair. Many people also use rosemary oil to help control dandruff, dryness, and scalp irritation while maintaining soft and manageable hair.",
      },
      {
        heading: "Social Media and Herbal Beauty Trends Increased Its Demand",
        body: "The popularity of rosemary oil has grown rapidly due to social media beauty trends, influencer recommendations, and increasing interest in Ayurvedic and herbal hair care solutions. Consumers are now more aware of the long-term benefits of natural ingredients compared to chemical-based hair products. As a result, rosemary oil has become a preferred option for people seeking healthier, shinier, and naturally nourished hair. Its combination of traditional wellness benefits and modern beauty appeal has made rosemary oil one of the biggest trends in natural hair care today.",
      },
    ],
    readMore: [
      {
        src: "/smalljournal.png",
        alt: "Can traditional ingredients help achieve naturally glowing skin?",
        title: "Can traditional ingredients help achieve naturally glowing skin?",
        href: "/journal/traditional-ingredients-skin",
      },
      {
        src: "/smalljournal2.png",
        alt: "Can a health mix support daily energy naturally?",
        title: "Can a health mix support daily energy naturally?",
        href: "/journal/health-mix-energy",
      },
      {
        src: "/smalljournal1.png",
        alt: "Why are people returning to traditional wellness?",
        title: "Why are people returning to traditional wellness?",
        href: "/journal/traditional-wellness",
      },
    ],
  },

  "health-mix-vs-processed": {
    slug: "health-mix-vs-processed",
    title: "Why is a traditional health mix better than processed breakfast drinks?",
    heroImage: "/litbigjournal.png",
    middleImage: "/middlejournal.png",
    sections: [
      {
        heading: "Made with Natural and Nutrient-Rich Ingredients",
        body: "Traditional health mixes are prepared using wholesome ingredients like millets, traditional rice varieties, pulses, nuts, and natural grains that are rich in fiber, protein, vitamins, and minerals. Unlike many processed breakfast drinks that may contain artificial flavors, refined sugar, preservatives, and synthetic additives, traditional health mixes focus on natural nutrition. Ingredients such as ragi, barley, black rice, and green gram provide sustained energy and nourishment while supporting overall wellness naturally.",
      },
      {
        heading: "Supports Better Digestion and Long-Lasting Energy",
        body: "One of the biggest advantages of traditional health mixes is their high fiber content, which helps improve digestion and keeps you feeling fuller for longer periods. Processed breakfast drinks often provide temporary energy due to added sugars and refined ingredients, which may lead to energy crashes later in the day. Traditional multigrain and millet-based health mixes release energy slowly, helping support metabolism, healthy weight management, and balanced nutrition throughout the day.",
      },
      {
        heading: "A Healthier Choice for Modern Lifestyles",
        body: "As people become more health-conscious, there is a growing shift towards clean eating and natural wellness. Traditional health mixes are valued because they are rooted in ancient food wisdom and prepared with minimal processing. They support a holistic lifestyle by providing natural nourishment without unnecessary chemicals or artificial ingredients. Whether consumed as a healthy breakfast or daily nutritional supplement, traditional health mixes offer a more balanced and sustainable alternative to heavily processed breakfast drinks.",
      },
    ],
    readMore: [
      {
        src: "/smalljournal.png",
        alt: "Can a health mix support daily energy naturally?",
        title: "Can a health mix support daily energy naturally?",
        href: "/journal/health-mix-energy",
      },
      {
        src: "/smalljournal1.png",
        alt: "Why is rosemary oil trending in hair care?",
        title: "Why is rosemary oil trending in hair care?",
        href: "/journal/rosemary-oil-hair",
      },
      {
        src: "/smalljournal2.png",
        alt: "Can traditional ingredients help achieve naturally glowing skin?",
        title: "Can traditional ingredients help achieve naturally glowing skin?",
        href: "/journal/traditional-ingredients-skin",
      },
    ],
  },

  "health-mix-energy": {
    slug: "health-mix-energy",
    title: "Can a health mix support daily energy naturally?",
    heroImage: "/litbigjournal.png",
    middleImage: "/middlejournal.png",
    sections: [
      {
        heading: "Traditional Ingredients Provide Sustained Energy",
        body: "A traditional health mix can naturally support daily energy levels because it is made with nutrient-rich ingredients like millets, traditional rice varieties, pulses, nuts, and grains. Ingredients such as ragi, barley, black rice, and green gram are rich in complex carbohydrates, protein, iron, and fiber that help provide steady energy throughout the day. Unlike sugary processed foods that cause sudden energy spikes and crashes, traditional health mixes release energy slowly and help maintain overall stamina naturally.",
      },
      {
        heading: "Rich in Essential Nutrients for Everyday Wellness",
        body: "Health mixes made from natural grains and legumes are packed with vitamins, minerals, antioxidants, and plant-based protein that help nourish the body and support daily activities. Ingredients like almonds, horse gram, and black gram help strengthen the body, while millets and traditional rice varieties support better digestion and metabolism. These nutrient-dense foods help keep the body active, improve focus, and support overall wellness when included as part of a balanced diet.",
      },
      {
        heading: "A Healthy Alternative for Busy Modern Lifestyles",
        body: "In today's fast-paced lifestyle, many people look for healthy and convenient breakfast options that provide long-lasting nourishment. Traditional health mixes are easy to prepare, filling, and suitable for all age groups, making them an ideal daily nutrition choice. Since they are usually free from artificial additives and heavily processed ingredients, they support natural wellness while helping maintain energy levels throughout the day. Regular consumption of a wholesome health mix, along with healthy lifestyle habits, can help promote better vitality and balanced nutrition naturally.",
      },
    ],
    readMore: [
      {
        src: "/smalljournal.png",
        alt: "Why is a traditional health mix better than processed breakfast drinks?",
        title: "Why is a traditional health mix better than processed breakfast drinks?",
        href: "/journal/health-mix-vs-processed",
      },
      {
        src: "/smalljournal1.png",
        alt: "Can traditional ingredients help achieve naturally glowing skin?",
        title: "Can traditional ingredients help achieve naturally glowing skin?",
        href: "/journal/traditional-ingredients-skin",
      },
      {
        src: "/smalljournal2.png",
        alt: "Why are people returning to traditional wellness?",
        title: "Why are people returning to traditional wellness?",
        href: "/journal/traditional-wellness",
      },
    ],
  },

  "kavuni-kanji-weight": {
    slug: "kavuni-kanji-weight",
    title: "Can Karuppu Kavuni kanji support weight management?",
    heroImage: "/litbigjournal.png",
    middleImage: "/middlejournal.png",
    sections: [
      {
        heading: "Rich in Fiber and Traditional Nutrition",
        body: "Karuppu Kavuni Kanji is made using traditional ingredients like Karuppu Kavuni rice, millets, and horse gram, which are naturally rich in dietary fiber and essential nutrients. Fiber-rich foods help keep you fuller for a longer time, which may help reduce unnecessary snacking and overeating. Unlike heavily processed breakfast options, this traditional health mix provides wholesome nourishment while supporting a balanced and healthy diet naturally.",
      },
      {
        heading: "Supports Better Digestion and Metabolism",
        body: "Traditional grains such as Karuppu Kavuni rice, Samai (Little Millet), and Kollu (Horse Gram) are valued for their digestive and metabolism-supporting properties. These ingredients are commonly included in traditional wellness diets because they may help improve gut health and support natural body balance. Horse gram, in particular, is widely known in traditional food practices for supporting healthy weight management when consumed regularly as part of a healthy lifestyle.",
      },
      {
        heading: "A Healthy and Filling Breakfast Choice",
        body: "Karuppu Kavuni Kanji can be a healthy breakfast option for people looking to maintain an active and balanced lifestyle. Since it provides sustained energy and helps keep the stomach satisfied for longer durations, it may help reduce cravings for unhealthy foods during the day. Combined with regular exercise and healthy eating habits, traditional kanji mixes can support natural wellness and healthy weight management in a simple and nourishing way.",
      },
    ],
    readMore: [
      {
        src: "/smalljournal.png",
        alt: "Can a simple kanji become a complete wellness meal?",
        title: "Can a simple kanji become a complete wellness meal?",
        href: "/journal/kanji-wellness-meal",
      },
      {
        src: "/smalljournal1.png",
        alt: "How do antioxidants in black rice benefit the body?",
        title: "How do antioxidants in black rice benefit the body?",
        href: "/journal/black-rice-antioxidants",
      },
      {
        src: "/smalljournal2.png",
        alt: "Can a health mix support daily energy naturally?",
        title: "Can a health mix support daily energy naturally?",
        href: "/journal/health-mix-energy",
      },
    ],
  },

  "kanji-wellness-meal": {
    slug: "kanji-wellness-meal",
    title: "Can a simple kanji become a complete wellness meal?",
    heroImage: "/litbigjournal.png",
    middleImage: "/middlejournal.png",
    sections: [
      {
        heading: "Traditional Kanji Is Packed with Natural Nutrition",
        body: "A simple kanji can become a complete wellness meal when prepared using traditional ingredients like Karuppu Kavuni rice, millets, pulses, and natural grains. These ingredients are rich in fiber, protein, iron, and essential nutrients that help nourish the body naturally. Traditional kanji recipes have been followed for generations because they provide balanced nutrition while remaining light, wholesome, and easy to digest. Unlike processed meals, kanji supports natural wellness through simple and clean ingredients.",
      },
      {
        heading: "Supports Energy, Digestion, and Daily Wellness",
        body: "Kanji is more than just a comfort food—it can support daily energy and overall well-being when consumed regularly as part of a healthy lifestyle. Fiber-rich ingredients help improve digestion and keep you feeling fuller for longer durations, while nutrient-dense grains and legumes provide steady energy throughout the day. Traditional wellness foods like kanji are also valued for their ability to support metabolism, gut health, and healthy eating habits naturally.",
      },
      {
        heading: "A Healthy Choice for Modern Lifestyles",
        body: "In today's busy lifestyle, many people are turning back to traditional wellness meals that are simple, nourishing, and easy to prepare. A wholesome kanji made from ancient grains and natural ingredients can serve as a healthy breakfast or light meal suitable for all age groups. Free from excessive processing and artificial additives, traditional kanji combines convenience with balanced nutrition, making it an ideal choice for people seeking natural wellness and healthier everyday eating habits.",
      },
    ],
    readMore: [
      {
        src: "/smalljournal.png",
        alt: "Can Karuppu Kavuni kanji support weight management?",
        title: "Can Karuppu Kavuni kanji support weight management?",
        href: "/journal/kavuni-kanji-weight",
      },
      {
        src: "/smalljournal1.png",
        alt: "How do antioxidants in black rice benefit the body?",
        title: "How do antioxidants in black rice benefit the body?",
        href: "/journal/black-rice-antioxidants",
      },
      {
        src: "/smalljournal2.png",
        alt: "Why are people returning to traditional wellness?",
        title: "Why are people returning to traditional wellness?",
        href: "/journal/traditional-wellness",
      },
    ],
  },

  "black-rice-antioxidants": {
    slug: "black-rice-antioxidants",
    title: "How do antioxidants in black rice benefit the body?",
    heroImage: "/litbigjournal.png",
    middleImage: "/middlejournal.png",
    sections: [
      {
        heading: "Rich Source of Powerful Natural Antioxidants",
        body: "Black rice, especially traditional varieties like Karuppu Kavuni rice, is naturally rich in antioxidants that help protect the body from harmful free radicals. The deep black and purple color of the rice comes from anthocyanins, the same antioxidant compounds found in berries and other superfoods. These antioxidants help support overall wellness by reducing oxidative stress and promoting healthier body functions naturally.",
      },
      {
        heading: "Supports Immunity, Heart Health, and Healthy Aging",
        body: "The antioxidants present in black rice may help strengthen the body's natural immunity and support overall health. Traditional black rice is also valued for supporting heart wellness by helping maintain healthy cholesterol levels when included as part of a balanced diet. Antioxidants can also help slow signs of premature aging by protecting skin cells and body tissues from environmental damage, making black rice a beneficial addition to a healthy lifestyle.",
      },
      {
        heading: "Promotes Better Digestion and Natural Energy",
        body: "Black rice is not only rich in antioxidants but also contains fiber, iron, and essential nutrients that support digestion and sustained energy. Fiber helps improve gut health and keeps you feeling fuller for longer, while iron supports healthy blood circulation and energy levels. As more people move towards natural wellness and traditional superfoods, black rice is becoming a popular choice for those seeking nutrient-rich foods that support long-term health naturally.",
      },
    ],
    readMore: [
      {
        src: "/smalljournal.png",
        alt: "Can Karuppu Kavuni kanji support weight management?",
        title: "Can Karuppu Kavuni kanji support weight management?",
        href: "/journal/kavuni-kanji-weight",
      },
      {
        src: "/smalljournal1.png",
        alt: "Can a simple kanji become a complete wellness meal?",
        title: "Can a simple kanji become a complete wellness meal?",
        href: "/journal/kanji-wellness-meal",
      },
      {
        src: "/smalljournal2.png",
        alt: "Why are people returning to traditional wellness?",
        title: "Why are people returning to traditional wellness?",
        href: "/journal/traditional-wellness",
      },
    ],
  },
};