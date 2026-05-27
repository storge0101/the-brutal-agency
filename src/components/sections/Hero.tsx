import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/links";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-white/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Texture overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/noise-texture.png)` }}
      />

      <div className="container relative z-10 mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              Marketing became predictable.<br />
              <span className="text-muted-foreground">So we </span>
              <span className="text-primary relative inline-block">
                broke it.
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
          >
            The Brutal Agency is a 360° digital marketing and growth agency combining strategy, performance marketing, design, and chaos.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6"
            >
            <a 
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-5 bg-primary text-black font-bold uppercase tracking-widest overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative">Start a Project</span>
            </a>
            
            <a 
              href="#work" 
              className="group inline-flex items-center justify-center px-8 py-5 border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:border-white transition-colors duration-300"
            >
              View Our Work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-muted-foreground"
      >
        <div className="w-12 h-[1px] bg-muted-foreground/50" />
        Scroll
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDownRight size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
