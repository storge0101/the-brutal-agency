import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

type CaseStudy = {
  id: string;
  client: string;
  service: string;
  headline: string;
  summary: string;
  image: string;
  imageAlt: string;
  metrics: Array<{ value: string; label: string }>;
};

const caseStudies: CaseStudy[] = [
  {
    id: "honda",
    client: "Honda Philippines",
    service: "Performance Marketing · Social Media",
    headline: "Five years at the front of the pack.",
    summary: "Brutal manages Honda Motorcycles across Meta, Instagram, Google Ads, and YouTube Ads. At national scale, disciplined media buying and community management kept the brand moving forward.",
    image: "honda.jpg",
    imageAlt: "Honda motorcycle campaign",
    metrics: [
      { value: "1.5M+", label: "New Facebook follows" },
      { value: "+115%", label: "Monthly ROAS increase" },
      { value: "3.2M", label: "Page followers" },
    ],
  },
  {
    id: "genteelhome",
    client: "Genteelhome",
    service: "Social Media · Lead Generation",
    headline: "Furniture that found its audience.",
    summary: "End-to-end social management, transparent monthly reporting, and a celebrity collaboration converted attention into qualified pipeline.",
    image: "genteelhome.jpg",
    imageAlt: "Genteelhome campaign report",
    metrics: [
      { value: "331.2K", label: "Views" },
      { value: "+49.4%", label: "Reach growth" },
      { value: "40", label: "Leads from one post" },
    ],
  },
  {
    id: "bezel",
    client: "Bezel Monitors",
    service: "Meta Campaigns · Product Launch",
    headline: "From silence to 219 conversations.",
    summary: "A messaging-led launch campaign turned a near-dormant inbox into a measurable demand channel inside a single 28-day window.",
    image: "bezel.jpg",
    imageAlt: "Bezel Monitors product launch campaign",
    metrics: [
      { value: "219", label: "Conversations started" },
      { value: "218", label: "New contacts" },
      { value: "123", label: "Intake leads" },
    ],
  },
  {
    id: "booked-to-overflow",
    client: "Booked to Overflow",
    service: "Paid Media · Funnel Validation",
    headline: "Two objectives. One validated funnel.",
    summary: "A controlled split between conversion and awareness proved where the budget worked hardest and established the next move for retargeting.",
    image: "booked-to-overflow.jpg",
    imageAlt: "Booked to Overflow campaign report",
    metrics: [
      { value: "25", label: "Conversations started" },
      { value: "₱44.44", label: "Cost per conversation" },
      { value: "4,386", label: "People reached" },
    ],
  },
  {
    id: "ideal-home",
    client: "Ideal Home",
    service: "TikTok Growth · Lead Generation",
    headline: "A million views from no presence at all.",
    summary: "A strategic audit and targeted campaign transformed a minimal TikTok presence into reach, leads, and measurable conversions.",
    image: "ideal-home.jpg",
    imageAlt: "Ideal Home social content",
    metrics: [
      { value: "1M+", label: "Campaign views" },
      { value: "~1,000", label: "Leads generated" },
      { value: "100+", label: "Conversions" },
    ],
  },
  {
    id: "salmon",
    client: "Salmon PH",
    service: "Community Marketing",
    headline: "A fintech community built from zero.",
    summary: "Strategic growth initiatives and engagement-driven content turned a new group into one of the most active fintech communities in the Philippines.",
    image: "salmon.jpg",
    imageAlt: "Salmon Philippines community campaign",
    metrics: [
      { value: "0", label: "Members at launch" },
      { value: "40K+", label: "Community members" },
      { value: "Organic", label: "Growth engine" },
    ],
  },
  {
    id: "edlin-indon",
    client: "Hon. Edlin Indon",
    service: "Public Figure · Organic Social",
    headline: "Most-followed councilor. Zero boost budget.",
    summary: "Disciplined organic publishing built the go-to page for inspirational content and daily community activity without paid boosting.",
    image: "edlin-indon.jpg",
    imageAlt: "Edlin Indon social media creative",
    metrics: [
      { value: "5.2K", label: "Followers" },
      { value: "4.6K", label: "Page likes" },
      { value: "₱0", label: "Boost spend" },
    ],
  },
  {
    id: "imprint",
    client: "IMPRINT 2025",
    service: "Event Production · Marketing",
    headline: "The Philippine design event of the year.",
    summary: "Workshops, portfolio reviews, fireside chats, and a live design battle brought the country's freelance design community under one roof.",
    image: "imprint.jpg",
    imageAlt: "IMPRINT 2025 event campaign",
    metrics: [
      { value: "404", label: "Attendees" },
      { value: "₱2.4M", label: "PR value" },
      { value: "615.1K", label: "Online views" },
    ],
  },
  {
    id: "adobe-prank",
    client: "Adobe April Fools",
    service: "Organic Social · Community",
    headline: "A million people reached in three hours.",
    summary: "One perfectly judged community post generated seven-figure organic reach with no spend and no seeding.",
    image: "adobe-organic.jpg",
    imageAlt: "The Brutal Agency organic campaign work",
    metrics: [
      { value: "1.4M", label: "Organic reach" },
      { value: "23,378", label: "Interactions" },
      { value: "9,999", label: "Shares" },
    ],
  },
];

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65 },
};

export default function Work() {
  const [active, setActive] = useState(caseStudies[0].id);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.title = "Case Studies | The Brutal Agency Philippines";
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
      setShowTop(window.scrollY > 800);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    caseStudies.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-clip bg-background text-foreground">
      <div className="fixed left-0 top-0 z-[70] h-1 bg-primary" style={{ width: `${progress}%` }} />
      <Navbar />

      <section className="relative flex min-h-[88vh] items-end border-b border-white/10 bg-grid-pattern pb-16 pt-40 md:pb-24">
        <div className="container mx-auto px-6">
          <motion.p {...reveal} className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-primary">
            Case Studies · The Brutal Agency Philippines
          </motion.p>
          <motion.h1 {...reveal} className="max-w-6xl font-display text-6xl font-black uppercase leading-[0.88] tracking-tighter sm:text-7xl md:text-9xl lg:text-[10rem]">
            Work that earns its <span className="text-primary">numbers.</span>
          </motion.h1>
          <motion.p {...reveal} className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            Real client reports. Real platform data. No projections, no vanity rounding, no soft focus.
          </motion.p>
        </div>
      </section>

      <nav className="sticky top-[73px] z-30 overflow-x-auto border-b border-white/10 bg-background/95 backdrop-blur-xl" aria-label="Jump to case study">
        <div className="container mx-auto flex min-w-max gap-2 px-6 py-4">
          {caseStudies.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                active === item.id ? "border-primary bg-primary text-black" : "border-white/15 text-muted-foreground hover:border-white hover:text-white"
              }`}
            >
              {item.client}
            </a>
          ))}
        </div>
      </nav>

      {caseStudies.map((item, index) => (
        <article id={item.id} key={item.id} className={`scroll-mt-40 border-b border-white/10 py-24 md:py-32 ${index % 2 ? "bg-secondary" : "bg-background"}`}>
          <div className="container mx-auto px-6">
            <motion.div {...reveal} className="mb-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-primary">{item.service}</p>
                <h2 className="font-display text-5xl font-black uppercase leading-[0.92] tracking-tighter md:text-7xl">{item.client}</h2>
              </div>
              <div className="lg:pt-7">
                <h3 className="mb-5 font-display text-2xl font-bold uppercase leading-tight md:text-4xl">{item.headline}</h3>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{item.summary}</p>
              </div>
            </motion.div>

            <motion.div {...reveal} className="mb-8 grid border-l border-t border-white/15 sm:grid-cols-3">
              {item.metrics.map((metric) => (
                <div key={metric.label} className="border-b border-r border-white/15 p-6 md:p-8">
                  <p className="font-display text-4xl font-black uppercase tracking-tighter text-primary md:text-6xl">{metric.value}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.figure {...reveal} className="group relative overflow-hidden border border-white/15 bg-black">
              <img
                src={`${import.meta.env.BASE_URL}images/work/${item.image}`}
                alt={item.imageAlt}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
              />
              <figcaption className="absolute bottom-0 left-0 bg-background/90 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                {item.client} · Selected Work
              </figcaption>
            </motion.figure>
          </div>
        </article>
      ))}

      <section className="border-b border-white/10 bg-primary py-24 text-black md:py-32">
        <div className="container mx-auto px-6">
          <h2 className="max-w-5xl font-display text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-9xl">Your numbers belong here.</h2>
          <a href="/contact" className="mt-10 inline-flex items-center gap-4 border-2 border-black px-7 py-5 text-sm font-black uppercase tracking-widest transition-colors hover:bg-black hover:text-white">
            Start a Project <ArrowUpRight size={20} />
          </a>
        </div>
      </section>

      <Footer />

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center border border-white/20 bg-background text-white transition-colors hover:border-primary hover:bg-primary hover:text-black"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </main>
  );
}
