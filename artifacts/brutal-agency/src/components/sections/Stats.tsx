import { motion } from "framer-motion";
import { Counter } from "@/components/Counter";

export function Stats() {
  const stats = [
    { value: 120, suffix: "+", label: "Combined Projects" },
    { value: 4, suffix: "x", label: "Average Ad ROAS" },
    { value: 10, suffix: "+", label: "Recurring Clients" },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <Counter 
                value={stat.value} 
                suffix={stat.suffix} 
                className="font-display text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-4"
              />
              <div className="h-1 w-12 bg-primary mb-6" />
              <p className="text-xl md:text-2xl font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-white/5 text-center"
        >
          <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-white/50">
            From print to digital, name it. <br className="hidden md:block" />
            <span className="text-white">We'll be on it.</span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
