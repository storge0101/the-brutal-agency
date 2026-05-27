import { motion } from "framer-motion";

export function About() {
  const sentences = [
    "We were community builders before we were marketers.",
    "We fell in love with brands, growth, and the chaos of making things work.",
    "10+ years of combined experience later, we decided to do it our way.",
    "The Brutal way."
  ];

  return (
    <section id="about" className="py-32 md:py-48 relative overflow-hidden">
      {/* Texture overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/noise-texture.png)` }}
      />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                Why <br/>Brutal?
              </h2>
              <div className="h-2 w-24 bg-primary" />
            </motion.div>
          </div>

          <div className="lg:w-2/3">
            <div className="flex flex-col gap-6 md:gap-8">
              {sentences.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`font-display text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight ${
                    i === sentences.length - 1 ? "text-primary" : "text-white/80"
                  }`}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Giant background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 pointer-events-none opacity-5 overflow-hidden w-full">
        <p className="font-display text-[20vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter">
          NO BULLSHIT
        </p>
      </div>
    </section>
  );
}
