import { ArrowRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submit
    alert("Subscribed to the chaos.");
  };

  return (
    <footer className="bg-secondary pt-24 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-24">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-6">
              The Brutal<span className="text-primary">.</span><br/>Agency
            </h3>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-semibold">
              We break rules.<br/>We build brands.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Work', 'Labs', 'About', 'Process', 'Careers'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-muted-foreground text-sm font-medium uppercase tracking-wider">
              <li>
                <a href="mailto:brrrrrr@getbrutal.ph" className="hover:text-primary transition-colors">
                  brrrrrr@getbrutal.ph
                </a>
              </li>
              <li>
                <a href="tel:+639177319457" className="hover:text-primary transition-colors">
                  +639177319457
                </a>
              </li>
              <li className="pt-4 flex gap-4">
                <a href="https://www.instagram.com/getbrutal.ph" target="_blank" rel="noreferrer" aria-label="Instagram @getbrutal.ph" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                <a href="https://www.facebook.com/getbrutal.ph" target="_blank" rel="noreferrer" aria-label="Facebook @getbrutal.ph" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                <a href="https://twitter.com/getbrutal.ph" target="_blank" rel="noreferrer" aria-label="Twitter @getbrutal.ph" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                <a href="https://www.youtube.com/@getbrutal.ph" target="_blank" rel="noreferrer" aria-label="YouTube @getbrutal.ph" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-6">The Manifesto</h4>
            <p className="text-muted-foreground text-sm mb-4">No spam. Just brutal marketing truths every Tuesday.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                required
                className="bg-background border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                className="bg-white text-black px-4 py-3 text-sm font-bold uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-between"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          <p>&copy; {new Date().getFullYear()} The Brutal Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
