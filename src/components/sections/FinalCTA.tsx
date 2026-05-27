import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section id="contact" className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Background Graphic */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl opacity-30 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-abstract.png)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-8 leading-none">
            Ready to grow <br/>
            <span className="text-primary">Brutally Fast?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            We only take on 4 new partners per quarter. If you're ready to scale aggressively and disrupt your market, let's talk.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative inline-flex items-center justify-center px-10 py-6 bg-primary text-black font-bold text-lg uppercase tracking-widest overflow-hidden">
              <span className="absolute inset-0 w-full h-full bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative">Book Strategy Call</span>
            </button>
            <button className="px-10 py-6 border-2 border-white/20 text-white font-bold text-lg uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all duration-300">
              Send an Email
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
