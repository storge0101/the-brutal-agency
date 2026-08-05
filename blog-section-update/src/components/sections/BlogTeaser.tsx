import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export function BlogTeaser() {
  return (
    <section id="blog" className="border-y border-white/10 bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-primary">
              Field Notes
            </p>
            <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
              Brutal <span className="text-stroke-primary">Blog</span>
            </h2>
          </motion.div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="/blog"
            className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-primary"
          >
            Read the notes
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/5 transition-colors group-hover:bg-primary/20">
              <ArrowUpRight size={18} />
            </span>
          </motion.a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.slug}
              href={`/blog#${post.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group border border-white/10 bg-secondary p-6 transition-colors hover:border-primary md:p-8"
            >
              <div className="mb-10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>{post.eyebrow}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
