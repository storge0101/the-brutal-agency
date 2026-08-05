import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  useEffect(() => {
    document.title = "Blog | The Brutal Agency Philippines";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative border-b border-white/10 bg-grid-pattern px-6 pb-20 pt-40 md:pb-28">
        <div className="container mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-xs font-black uppercase tracking-[0.35em] text-primary"
          >
            Marketing Notes · Growth Lessons · Philippine Market
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="max-w-6xl font-display text-6xl font-black uppercase leading-[0.88] tracking-tighter md:text-9xl"
          >
            Notes from the <span className="text-primary">growth lab.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Practical thinking on growth marketing, paid ads, social media systems, brand strategy,
            and building demand in the Philippines.
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[0.36fr_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border border-white/10 bg-secondary p-6">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-primary">
                Index
              </p>
              <nav className="grid gap-4">
                {blogPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`#${post.slug}`}
                    className="text-sm font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-white"
                  >
                    {post.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="grid gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                id={post.slug}
                key={post.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.04 }}
                className="scroll-mt-32 border border-white/10 bg-secondary"
              >
                <div className="border-b border-white/10 p-6 md:p-8">
                  <div className="mb-8 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="text-primary">{post.eyebrow}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">
                    {post.title}
                  </h2>
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                <div className="grid gap-5 p-6 text-base leading-relaxed text-muted-foreground md:p-8 md:text-lg">
                  {post.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <a
                    href="/contact"
                    className="mt-5 inline-flex w-fit items-center gap-3 bg-primary px-5 py-4 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-white"
                  >
                    Talk to Brutal <ArrowUpRight size={18} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
