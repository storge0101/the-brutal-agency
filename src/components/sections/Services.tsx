import { motion } from "framer-motion";
import { TrendingUp, Video, PenTool, Hash, Globe, GraduationCap } from "lucide-react";

const labs = [
  {
    id: "01",
    title: "The Brutal PerformanceLab",
    icon: <TrendingUp size={32} />,
    desc: "Performance Marketing & Growth",
    bullets: ["Paid Ads (Meta, Google, TikTok)", "Growth Strategy", "Funnel Optimization", "Data Analytics", "Scaling Frameworks"]
  },
  {
    id: "02",
    title: "The Brutal MotionLab",
    icon: <Video size={32} />,
    desc: "Video Editing & Motion Graphics",
    bullets: ["Social Media Content", "Motion Graphics", "Brand Manifestos", "High-Converting Creatives", "YouTube Post-Production"]
  },
  {
    id: "03",
    title: "The Brutal BrandLab",
    icon: <PenTool size={32} />,
    desc: "Brand Identity & Design Systems",
    bullets: ["Brand Strategy & Identity", "Logo Design", "Visual Systems", "Brand Guidelines", "Packaging Design"]
  },
  {
    id: "04",
    title: "The Brutal Social",
    icon: <Hash size={32} />,
    desc: "Content Marketing & UGC",
    bullets: ["Social Media Strategy", "Content Calendars", "Influencer Campaigns", "UGC Sourcing", "Short-form Dominance"]
  },
  {
    id: "05",
    title: "The Brutal WebLab",
    icon: <Globe size={32} />,
    desc: "Landing Pages & CRO",
    bullets: ["High-Converting Landing Pages", "Webflow Development", "Conversion Rate Optimization", "A/B Testing", "Marketing Sites"]
  },
  {
    id: "06",
    title: "The Brutal TrainingLab",
    icon: <GraduationCap size={32} />,
    desc: "Trainings & Workshops",
    bullets: ["Digital Marketing Bootcamps", "Design Workshops", "Corporate Training", "Agency SOPs", "Certifications"]
  }
];

export function Services() {
  return (
    <section id="labs" className="py-24 md:py-32 bg-background border-t border-white/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            Our <span className="text-primary">Labs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Specialized divisions. Weaponized expertise. We don't do generalists.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab, index) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-white/5 p-8 hover:border-primary transition-all duration-300 hover:-translate-y-2 cursor-crosshair flex flex-col h-full"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-primary transition-colors duration-300" />
              
              <div className="text-muted-foreground group-hover:text-primary transition-colors mb-6 flex justify-between items-start">
                <div className="p-3 bg-white/5 group-hover:bg-primary/10 rounded-sm">
                  {lab.icon}
                </div>
                <span className="font-display font-bold text-2xl opacity-30 group-hover:opacity-100">{lab.id}</span>
              </div>
              
              <h3 className="font-display text-2xl font-bold uppercase mb-2 group-hover:text-white">
                {lab.title}
              </h3>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-6">
                {lab.desc}
              </p>
              
              <ul className="space-y-3 mt-auto flex-grow">
                {lab.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 bg-white/20 group-hover:bg-primary mt-1.5 rounded-full shrink-0 transition-colors" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
