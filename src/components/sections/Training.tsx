import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Training() {
  const programs = [
    { title: "Digital Marketing Certification", duration: "12 Weeks", tag: "Intensive" },
    { title: "Design Systems & Branding", duration: "6 Weeks", tag: "Workshop" },
    { title: "Corporate Growth Teams", duration: "Custom", tag: "B2B" }
  ];

  return (
    <section className="py-24 bg-primary text-black overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                The Training <br/> Lab
              </h2>
              <p className="text-2xl font-medium mb-8 max-w-md border-l-4 border-black pl-6">
                Stop hiring mediocre talent. We train marketers to think like operators.
              </p>
              <button className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                View Syllabus
              </button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col gap-4">
              {programs.map((prog, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-black/5 hover:bg-black p-6 md:p-8 cursor-pointer transition-colors duration-300 flex items-center justify-between"
                >
                  <div>
                    <div className="flex gap-4 items-center mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 border border-black/20 group-hover:border-white/20 group-hover:text-white">
                        {prog.tag}
                      </span>
                      <span className="text-sm font-semibold group-hover:text-white/60">
                        {prog.duration}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase group-hover:text-white">
                      {prog.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-black group-hover:bg-primary flex items-center justify-center text-white group-hover:text-black transition-colors shrink-0">
                    <ArrowRight />
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
