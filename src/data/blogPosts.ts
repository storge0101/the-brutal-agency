export type BlogPost = {
  slug: string;
  title: string;
  eyebrow: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "growth-marketing-philippines",
    title: "What Growth Marketing Actually Means in the Philippines",
    eyebrow: "Growth Strategy",
    date: "2026-08-05",
    readTime: "4 min read",
    excerpt:
      "Growth marketing is not just ads. It is the operating system behind testing, learning, and scaling revenue without guessing.",
    body: [
      "Growth marketing in the Philippines often gets reduced to boosting posts, launching ads, or chasing whichever platform is hot this quarter. That is not growth. That is activity.",
      "Real growth marketing starts with a business objective, then builds a system around audience research, offer testing, creative iteration, paid distribution, conversion tracking, and post-campaign learning.",
      "For brands that want compounding results, the question is not only how many people saw the campaign. The sharper question is what the campaign taught the business and how quickly that learning can be turned into the next test.",
    ],
  },
  {
    slug: "performance-marketing-not-just-media-buying",
    title: "Performance Marketing Is Not Just Media Buying",
    eyebrow: "Paid Ads",
    date: "2026-08-05",
    readTime: "3 min read",
    excerpt:
      "Buying media is only one part of performance. The real advantage comes from sharper offers, faster creative tests, and cleaner measurement.",
    body: [
      "A media buyer can launch campaigns. A performance marketing team improves the entire machine around the campaign.",
      "That means the landing page, offer, audience, budget logic, reporting cadence, creative volume, and sales feedback loop all matter. If one part is weak, the campaign pays for it.",
      "The Brutal Agency treats paid media as a testing lab. Every peso should either create a result or reveal what needs to change next.",
    ],
  },
  {
    slug: "why-brands-need-content-systems",
    title: "Why Brands Need Content Systems, Not Random Posts",
    eyebrow: "Social Media",
    date: "2026-08-05",
    readTime: "3 min read",
    excerpt:
      "Posting more is not a strategy. A content system gives every post a job, every campaign a rhythm, and every result a lesson.",
    body: [
      "A brand does not win by posting whenever inspiration hits. It wins by building a content system that can repeat attention, trust, and demand.",
      "That system usually includes content pillars, audience angles, campaign themes, production cadence, approval rules, reporting, and a clear view of what each post is meant to do.",
      "The goal is not to make the feed look busy. The goal is to make the market understand why the brand matters.",
    ],
  },
];
