import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    client: "Salmon Philippines",
    industry: "Fintech",
    metric: "40,000+ Members",
    challenge: "Transformed a fintech community from zero members through strategic growth initiatives and engagement-driven content, cultivating a space of positive sentiment and active participation.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    tag: "Community Growth",
  },
  {
    client: "Honda Philippines",
    industry: "Automotive",
    metric: "+115% ROAS / Month",
    challenge: "4+ years of trusted partnership growing their community followers and maximizing ad efficiency. Ran Display, YouTube, Google, and Meta Ads — achieving the lowest CPR possible while boosting brand engagement.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000",
    tag: "Performance Marketing",
  },
  {
    client: "Bezel Monitors",
    industry: "Consumer Tech",
    metric: "Bezel Prime 2 Launch",
    challenge: "Handled the full production and launch campaign for the Bezel Prime 2 — from pre-launch hype building to launch-day execution, driving awareness and conversion across all digital channels.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000",
    tag: "Product Launch",
  },
  {
    client: "Coach Edz Eugenio",
    industry: "Publishing",
    metric: "+300% Reach · +65% Book Sales",
    challenge: "Launched a personal brand on Facebook to promote and sell a book. Grew followers and reach by 300% through targeted content strategy, and drove a 65% uplift in book purchases.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
    tag: "Personal Branding",
  },
];

export function Portfolio() {
  return (
    <section id="work" className="py-24 md:py-32 bg-secondary border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Brutal <br/> <span className="text-stroke-primary">Work</span>
            </h2>
          </motion.div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#contact"
            className="group flex items-center gap-4 text-white font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Start a Project
            <span className="p-3 bg-white/5 group-hover:bg-primary/20 rounded-full transition-colors">
              <ArrowUpRight size={20} />
            </span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden bg-background aspect-square md:aspect-[4/3] block cursor-pointer border border-white/10"
            >
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.client}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-white w-fit">
                      {project.industry}
                    </span>
                    <span className="px-4 py-1.5 bg-primary/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-primary w-fit">
                      {project.tag}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-primary flex items-center justify-center -translate-y-4 translate-x-4 opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight size={24} className="text-black" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-2">
                    {project.client}
                  </h3>
                  <p className="text-muted-foreground max-w-sm mb-6 line-clamp-3 text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                  <div className="inline-block px-4 py-2 border-2 border-primary text-primary font-bold text-base uppercase tracking-wider">
                    {project.metric}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
