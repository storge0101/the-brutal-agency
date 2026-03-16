import { motion } from "framer-motion";

const steps = [
  { id: "01", title: "Discovery & Audit", desc: "We tear down your current setup to find the leaks. No assumptions, just data." },
  { id: "02", title: "Strategy Architecture", desc: "Building the blueprint. Positioning, offers, and channels mapped out." },
  { id: "03", title: "Creative Production", desc: "Our MotionLab and BrandLab build high-converting assets designed to disrupt." },
  { id: "04", title: "Launch & Test", desc: "Deploying campaigns with tight budgets to validate hypotheses rapidly." },
  { id: "05", title: "Brutal Scaling", desc: "Once we find the winners, we pour gasoline on the fire. Infinite scale." }
];

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6"
            >
              The <br/> Brutal <br/> <span className="text-primary">Method</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              A systematic approach to predictable, violent growth. We don't guess.
            </motion.p>
          </div>

          <div className="lg:w-2/3">
            <div className="flex flex-col gap-12">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-6 md:gap-12 group"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-display text-5xl md:text-7xl font-black text-white/10 group-hover:text-primary transition-colors duration-500">
                      {step.id}
                    </span>
                    {index !== steps.length - 1 && (
                      <div className="w-[1px] h-full bg-white/10 group-hover:bg-primary/50 mt-4 transition-colors duration-500" />
                    )}
                  </div>
                  
                  <div className="pb-12 pt-2">
                    <h3 className="font-display text-2xl md:text-4xl font-bold uppercase text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
