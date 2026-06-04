import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const serviceOptions = [
  "Growth Strategy",
  "Paid Ads",
  "Branding",
  "Web Design",
  "Content",
  "Lead Generation",
];

const budgetOptions = [
  "Under ₱50K",
  "₱50K-₱150K",
  "₱150K-₱300K",
  "₱300K+",
  "Not sure yet",
];

const timelineOptions = [
  "ASAP",
  "This month",
  "Next 30-60 days",
  "Still exploring",
];

const WEB3FORMS_ACCESS_KEY = "9aee4c41-befc-4da1-91ac-cef718b748ea";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  timeline: string;
  services: string[];
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  budget: "",
  timeline: "",
  services: [],
  message: "",
};

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleService = (service: string) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New Brutal Agency project inquiry",
          from_name: "The Brutal Agency Website",
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          budget: form.budget,
          timeline: form.timeline,
          services: form.services.join(", "),
          message: form.message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Something went wrong.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setError(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <section id="inquiry" className="py-28 md:py-40 bg-secondary border-y border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-primary">
              Project Intake
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">
              Tell us what needs to get brutal.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Drop the essentials. We use this to understand your goals, budget,
              timeline, and the kind of growth system your brand needs.
            </p>
            <div className="mt-10 grid gap-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <span>Response window: 24-48 hours</span>
              <span>Best for: serious launches, campaigns, and growth work</span>
              <span>Signal over noise. No generic discovery calls.</span>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-white/10 bg-background p-5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Name
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                  className="border border-white/10 bg-secondary px-4 py-4 text-base text-white outline-none transition-colors focus:border-primary"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                  className="border border-white/10 bg-secondary px-4 py-4 text-base text-white outline-none transition-colors focus:border-primary"
                  placeholder="you@brand.com"
                />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Phone
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="border border-white/10 bg-secondary px-4 py-4 text-base text-white outline-none transition-colors focus:border-primary"
                  placeholder="+63..."
                />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Company / Brand
                <input
                  value={form.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  className="border border-white/10 bg-secondary px-4 py-4 text-base text-white outline-none transition-colors focus:border-primary"
                  placeholder="Brand name"
                />
              </label>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                What do you need?
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {serviceOptions.map((service) => {
                  const selected = form.services.includes(service);
                  return (
                    <button
                      type="button"
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`border px-3 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                        selected
                          ? "border-primary bg-primary text-black"
                          : "border-white/10 bg-secondary text-muted-foreground hover:border-primary hover:text-white"
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Budget Range
                <select
                  value={form.budget}
                  onChange={(event) => updateField("budget", event.target.value)}
                  className="border border-white/10 bg-secondary px-4 py-4 text-base text-white outline-none transition-colors focus:border-primary"
                >
                  <option value="">Select range</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Timeline
                <select
                  value={form.timeline}
                  onChange={(event) => updateField("timeline", event.target.value)}
                  className="border border-white/10 bg-secondary px-4 py-4 text-base text-white outline-none transition-colors focus:border-primary"
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-7 grid gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Project Details
              <textarea
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                required
                rows={6}
                className="resize-none border border-white/10 bg-secondary px-4 py-4 text-base normal-case tracking-normal text-white outline-none transition-colors focus:border-primary"
                placeholder="Tell us what you're building, what's broken, and what result you want."
              />
            </label>

            {status === "success" && (
              <div className="mt-6 flex items-center gap-3 border border-primary/40 bg-primary/10 px-4 py-4 text-sm font-bold uppercase tracking-widest text-primary">
                <CheckCircle2 size={20} />
                Inquiry sent. We’ll review it and reply soon.
              </div>
            )}

            {status === "error" && (
              <div className="mt-6 border border-red-500/40 bg-red-500/10 px-4 py-4 text-sm font-bold uppercase tracking-widest text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 flex w-full items-center justify-center gap-3 bg-primary px-8 py-5 text-base font-black uppercase tracking-widest text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : null}
              Send Inquiry
              {status !== "loading" ? <ArrowRight size={20} /> : null}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
