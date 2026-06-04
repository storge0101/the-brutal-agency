import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContact, setIsContact] = useState(false);

  useEffect(() => {
    setIsContact(window.location.pathname === "/contact");
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", anchor: "work" },
    { name: "Labs", anchor: "labs" },
    { name: "About", anchor: "about" },
    { name: "Process", anchor: "process" },
  ];

  function getHref(anchor) {
    if (isContact) {
      return "/#" + anchor;
    }
    return "#" + anchor;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            className="font-display font-black text-2xl tracking-tighter uppercase z-50"
          >
            The Brutal<span className="text-primary">.</span>Agency
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={getHref(link.anchor)}
                    className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors duration-300"
            >
              Start a Project
            </a>
          </nav>

          <button
            className="md:hidden z-50 text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={getHref(link.anchor)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-4xl font-bold uppercase tracking-wider hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mt-8">
                <a
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider text-xl hover:bg-white hover:text-black transition-colors"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
