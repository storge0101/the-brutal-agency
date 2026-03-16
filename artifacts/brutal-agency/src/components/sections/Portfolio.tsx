import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    client: "Volt Energy",
    industry: "E-Commerce",
    metric: "+320% ROAS",
    challenge: "Scaled daily spend from $500 to $5k while maintaining profitability.",
    // Unsplash tech/energy abstract
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
  },
  {
    client: "Nexus SaaS",
    industry: "B2B Software",
    metric: "-45% CAC",
    challenge: "Redesigned landing pages and optimized search intent targeting.",
    // Unsplash abstract software/code
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000",
  },
  {
    client: "Iron Athletics",
    industry: "Fitness Apparel",
    metric: "+1.2M Views",
    challenge: "Viral TikTok strategy combined with aggressive retargeting.",
    // Unsplash dark fitness
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000",
  },
  {
    client: "Noir Coffee",
    industry: "F&B",
    metric: "3x LTV",
    challenge: "Built a subscription retention model through email and SMS.",
    // Unsplash dark coffee
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000",
  }
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
            See More Case Studies
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
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-white">
                    {project.industry}
                  </span>
                  <div className="w-12 h-12 bg-primary flex items-center justify-center -translate-y-4 translate-x-4 opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight size={24} className="text-black" />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white mb-2">
                    {project.client}
                  </h3>
                  <p className="text-muted-foreground max-w-sm mb-6 line-clamp-2">
                    {project.challenge}
                  </p>
                  <div className="inline-block px-4 py-2 border-2 border-primary text-primary font-bold text-lg uppercase tracking-wider">
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
