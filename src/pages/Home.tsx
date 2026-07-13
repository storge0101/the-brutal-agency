import { useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { Training } from "@/components/sections/Training";
import { LeadForm } from "@/components/sections/LeadForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  useEffect(() => {
    if (window.location.hash === "#work") {
      window.location.replace("/work");
    }
  }, []);

  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Process />
      <Training />
      <LeadForm />
      <FinalCTA />
      <Footer />
    </main>
  );
}
