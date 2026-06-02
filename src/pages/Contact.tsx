import { Navbar } from "@/components/sections/Navbar";
import { LeadForm } from "@/components/sections/LeadForm";
import { Footer } from "@/components/sections/Footer";

export default function Contact() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <LeadForm />
      <Footer />
    </main>
  );
}
