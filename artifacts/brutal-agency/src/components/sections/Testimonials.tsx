import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The Brutal Agency doesn't just execute marketing. They engineer absolute growth. The attention to detail is terrifying.",
    author: "Sarah Jenkins",
    role: "Founder, Tech Company"
  },
  {
    quote: "They combine raw creativity with real performance marketing. Our ROAS tripled in 3 months. Brutal by name, brilliant by nature.",
    author: "Marcus Chen",
    role: "CEO, E-commerce Brand"
  },
  {
    quote: "Best investment we made for our brand identity. They stripped away the corporate fluff and found our actual voice.",
    author: "Elena Rodriguez",
    role: "CMO, Fashion Label"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Words from the trenches
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-secondary p-8 md:p-10 border border-white/5 relative"
            >
              <div className="flex gap-1 mb-8 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-lg md:text-xl font-medium leading-relaxed text-white/90 mb-8 italic">
                "{item.quote}"
              </p>
              
              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="font-bold text-white uppercase tracking-wider text-sm mb-1">
                  {item.author}
                </p>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
