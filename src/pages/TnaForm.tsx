import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  department: string;
  experience: string;
  tools_used: string[];
  frequency: string;
  prompt_skill: string;
  copilot_access: string;
  time_sinks: string[];
  painpoint: string;
  priorities: string[];
  learning_style: string;
  session_slot: string;
  device: string;
  success_metric: string;
  concerns: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  department: "",
  experience: "",
  tools_used: [],
  frequency: "",
  prompt_skill: "",
  copilot_access: "",
  time_sinks: [],
  painpoint: "",
  priorities: [],
  learning_style: "",
  session_slot: "",
  device: "",
  success_metric: "",
  concerns: "",
};

const steps = ["You", "AI Level", "Time Sinks", "Priorities", "Logistics"];
const departments = ["Creative / Design", "Copy / Content", "Accounts / Client Service", "Media / Performance", "Strategy / Planning", "Ops / Admin / Finance", "Leadership"];
const tools = ["ChatGPT", "Claude", "Microsoft Copilot", "Gemini", "Midjourney / DALL-E", "Canva AI", "Notion AI", "Meta Advantage+ / AI ad tools", "Other", "None yet"];
const timeSinks = ["Client reports & decks", "Campaign briefs & proposals", "Copy variations & captions", "Media plans & budget sheets", "Meeting notes & recaps", "Client emails & follow-ups", "Research & competitor scans", "Data analysis / performance pulls", "Content calendars", "Internal docs & SOPs"];
const priorityOptions = [
  "Prompt engineering fundamentals",
  "Generating reports & decks with Claude",
  "Microsoft Copilot mastery",
  "AI for creative & content",
  "Data analysis with AI",
  "Workflow automation",
  "AI ethics, accuracy & client safety",
];

function Chip({
  active,
  children,
  onClick,
  disabled = false,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`border px-4 py-3 text-left text-xs font-bold uppercase tracking-widest transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-primary bg-primary text-black"
          : "border-white/15 bg-background text-muted-foreground hover:border-primary hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function FieldLabel({ children, required = false }: { children: string; required?: boolean }) {
  return (
    <label className="mb-3 block text-xs font-black uppercase tracking-[0.25em] text-white">
      {children} {required && <span className="text-primary">*</span>}
    </label>
  );
}

export default function TnaForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [delivery, setDelivery] = useState("");

  useEffect(() => {
    document.title = "AI Training Needs Analysis | The Brutal Agency";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex,nofollow,noarchive";
    document.head.appendChild(robots);
    return () => {
      robots.remove();
    };
  }, []);

  const valid = useMemo(() => {
    if (step === 0) return Boolean(form.name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.department);
    if (step === 1) return Boolean(form.tools_used.length && form.frequency && form.prompt_skill && form.copilot_access);
    if (step === 2) return form.time_sinks.length > 0;
    if (step === 3) return Boolean(form.priorities.length && form.learning_style);
    return Boolean(form.session_slot && form.device && form.success_metric);
  }, [form, step]);

  const setValue = (key: keyof FormState, value: string | string[]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const toggleList = (key: "tools_used" | "time_sinks", value: string, max = 99) => {
    setForm((current) => {
      const list = current[key];
      if (key === "tools_used" && value === "None yet") {
        return { ...current, [key]: list.includes(value) ? [] : [value] };
      }
      const withoutExclusive = key === "tools_used" ? list.filter((item) => item !== "None yet") : list;
      if (withoutExclusive.includes(value)) {
        return { ...current, [key]: withoutExclusive.filter((item) => item !== value) };
      }
      if (withoutExclusive.length >= max) {
        setError(`Pick up to ${max} only.`);
        return current;
      }
      return { ...current, [key]: [...withoutExclusive, value] };
    });
  };

  const togglePriority = (value: string) => {
    setForm((current) => {
      if (current.priorities.includes(value)) {
        return { ...current, priorities: current.priorities.filter((item) => item !== value) };
      }
      if (current.priorities.length >= 3) {
        setError("Top 3 only. Tap a ranked item to remove it.");
        return current;
      }
      return { ...current, priorities: [...current.priorities, value] };
    });
  };

  const next = async () => {
    if (!valid) {
      setError("Complete the required fields before continuing.");
      return;
    }
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/tna-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.error) {
        throw new Error(result.error || "Could not submit the form.");
      }
      setDelivery(Array.isArray(result.delivery) ? result.delivery.join(", ") : result.delivery || "saved");
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Could not submit the form.");
    }
  };

  if (status === "done") {
    return (
      <main className="min-h-screen bg-background px-6 py-16 text-foreground">
        <section className="mx-auto max-w-3xl border border-white/15 bg-secondary p-8 text-center md:p-14">
          <div className="mx-auto mb-8 grid h-20 w-20 place-items-center border-2 border-primary text-primary">
            <Check size={42} />
          </div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-primary">Form TNA-001</p>
          <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tighter md:text-7xl">You are locked in.</h1>
          <p className="mx-auto mt-8 max-w-xl text-muted-foreground">
            Your responses are with the facilitation team. The final agenda built from everyone's answers lands before July 25.
          </p>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-white">
            {form.session_slot ? `See you on ${form.session_slot}.` : "Response received."}
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">Delivery: {delivery}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background bg-grid-pattern px-5 py-8 text-foreground md:py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 border border-white/15 bg-background/95">
          <div className="flex flex-col border-b border-white/15 sm:flex-row sm:items-stretch sm:justify-between">
            <a href="/" className="px-5 py-4 font-display text-xl font-black uppercase tracking-tighter">
              The Brutal<span className="text-primary">.</span>Agency
            </a>
            <div className="bg-primary px-5 py-4 text-xs font-black uppercase tracking-[0.25em] text-black">Form TNA-001</div>
          </div>
          <div className="p-6 md:p-10">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl"
            >
              AI Training Needs <span className="text-primary">Analysis</span>
            </motion.h1>
            <p className="mt-6 max-w-2xl text-muted-foreground">
              Before the session, tell us how you actually work. Your answers shape the agenda, demos, and templates.
            </p>
          </div>
          <div className="grid border-t border-white/15 text-xs font-bold uppercase tracking-widest text-muted-foreground md:grid-cols-3">
            <div className="border-white/15 p-4 md:border-r">Session date <span className="block text-primary">July 25, 2026</span></div>
            <div className="border-white/15 p-4 md:border-r">Duration <span className="block text-primary">Minimum 2 hours</span></div>
            <div className="p-4">Format <span className="block text-primary">Hands-on workshop</span></div>
          </div>
        </header>

        <nav className="sticky top-0 z-20 mb-8 grid grid-cols-5 border border-white/15 bg-background/95 backdrop-blur-xl">
          {steps.map((name, index) => (
            <button
              key={name}
              type="button"
              onClick={() => index < step && setStep(index)}
              className={`border-r border-white/15 px-2 py-3 text-center text-[10px] font-black uppercase tracking-widest last:border-r-0 ${
                index === step ? "bg-primary text-black" : index < step ? "bg-white text-black" : "text-muted-foreground"
              }`}
            >
              <span className="block text-sm">{String(index + 1).padStart(2, "0")}</span>
              <span className="hidden sm:inline">{name}</span>
            </button>
          ))}
        </nav>

        <form className="border border-white/15 bg-secondary p-5 md:p-8" onSubmit={(event) => event.preventDefault()}>
          {step === 0 && (
            <div className="grid gap-6">
              <h2 className="font-display text-3xl font-black uppercase">01 · About You</h2>
              <div>
                <FieldLabel required>Full name</FieldLabel>
                <input value={form.name} onChange={(event) => setValue("name", event.target.value)} className="w-full border border-white/15 bg-background px-4 py-4 text-white outline-none focus:border-primary" placeholder="Juan Dela Cruz" />
              </div>
              <div>
                <FieldLabel required>Work email</FieldLabel>
                <input type="email" value={form.email} onChange={(event) => setValue("email", event.target.value)} className="w-full border border-white/15 bg-background px-4 py-4 text-white outline-none focus:border-primary" placeholder="you@agency.com" />
              </div>
              <div>
                <FieldLabel required>Which team are you on?</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">{departments.map((item) => <Chip key={item} active={form.department === item} onClick={() => setValue("department", item)}>{item}</Chip>)}</div>
              </div>
              <div>
                <FieldLabel>Years in the industry</FieldLabel>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{["0-2", "3-5", "6-10", "10+"].map((item) => <Chip key={item} active={form.experience === item} onClick={() => setValue("experience", item)}>{item}</Chip>)}</div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-7">
              <h2 className="font-display text-3xl font-black uppercase">02 · Where You Are With AI</h2>
              <div>
                <FieldLabel required>Which AI tools have you used for work?</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">{tools.map((item) => <Chip key={item} active={form.tools_used.includes(item)} onClick={() => toggleList("tools_used", item)}>{item}</Chip>)}</div>
              </div>
              <div>
                <FieldLabel required>How often do you use AI?</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">{["Daily", "Few times a week", "Occasionally", "Rarely / Never"].map((item) => <Chip key={item} active={form.frequency === item} onClick={() => setValue("frequency", item)}>{item}</Chip>)}</div>
              </div>
              <div>
                <FieldLabel required>Rate your prompt-writing skill</FieldLabel>
                <div className="grid grid-cols-5 border border-white/15">
                  {["1", "2", "3", "4", "5"].map((item) => (
                    <button key={item} type="button" onClick={() => setValue("prompt_skill", item)} className={`border-r border-white/15 py-4 font-display text-2xl font-black last:border-r-0 ${form.prompt_skill === item ? "bg-primary text-black" : "bg-background text-white"}`}>{item}</button>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel required>Do you have Microsoft Copilot access?</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">{["Yes, licensed", "Yes, but rarely open it", "Not sure", "No"].map((item) => <Chip key={item} active={form.copilot_access === item} onClick={() => setValue("copilot_access", item)}>{item}</Chip>)}</div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-7">
              <h2 className="font-display text-3xl font-black uppercase">03 · Your Time Sinks</h2>
              <div>
                <FieldLabel required>Which tasks eat the most of your week?</FieldLabel>
                <p className="mb-4 text-sm text-muted-foreground">Pick up to 4. These become the live demos in the session.</p>
                <div className="grid gap-3 sm:grid-cols-2">{timeSinks.map((item) => <Chip key={item} active={form.time_sinks.includes(item)} onClick={() => toggleList("time_sinks", item, 4)}>{item}</Chip>)}</div>
              </div>
              <div>
                <FieldLabel>Describe one repetitive task you'd love to hand off to AI</FieldLabel>
                <textarea value={form.painpoint} onChange={(event) => setValue("painpoint", event.target.value)} className="min-h-32 w-full border border-white/15 bg-background px-4 py-4 text-white outline-none focus:border-primary" placeholder="Every month I..." />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-7">
              <h2 className="font-display text-3xl font-black uppercase">04 · What To Teach You</h2>
              <div>
                <FieldLabel required>Rank your top 3 learning priorities</FieldLabel>
                <div className="grid gap-3">
                  {priorityOptions.map((item) => {
                    const rank = form.priorities.indexOf(item) + 1;
                    return (
                      <button key={item} type="button" onClick={() => togglePriority(item)} className={`flex items-center gap-4 border p-4 text-left transition-colors ${rank ? "border-primary bg-primary text-black" : "border-white/15 bg-background text-white hover:border-primary"}`}>
                        <span className="grid h-10 w-10 shrink-0 place-items-center border border-current font-display font-black">{rank || "-"}</span>
                        <span className="text-sm font-bold uppercase tracking-wider">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <FieldLabel required>How do you learn best?</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-2">{["Hands-on - I do it live", "Demo first, then I try", "Walkthrough with templates", "Mix of everything"].map((item) => <Chip key={item} active={form.learning_style === item} onClick={() => setValue("learning_style", item)}>{item}</Chip>)}</div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-7">
              <h2 className="font-display text-3xl font-black uppercase">05 · Logistics & Goals</h2>
              <div>
                <FieldLabel required>Pick your session slot</FieldLabel>
                <div className="grid gap-4 md:grid-cols-2">
                  {["10:00 AM - July 25, 2026", "5:00 PM - July 25, 2026"].map((item) => <Chip key={item} active={form.session_slot === item} onClick={() => setValue("session_slot", item)}>{item}</Chip>)}
                </div>
              </div>
              <div>
                <FieldLabel required>Will you bring a laptop?</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-3">{["Yes, my own", "Need one provided", "Phone / tablet only"].map((item) => <Chip key={item} active={form.device === item} onClick={() => setValue("device", item)}>{item}</Chip>)}</div>
              </div>
              <div>
                <FieldLabel required>This training is a win if I can...</FieldLabel>
                <textarea value={form.success_metric} onChange={(event) => setValue("success_metric", event.target.value)} className="min-h-32 w-full border border-white/15 bg-background px-4 py-4 text-white outline-none focus:border-primary" placeholder="...produce a client report draft in 30 minutes instead of 3 hours." />
              </div>
              <div>
                <FieldLabel>Any hesitations or concerns?</FieldLabel>
                <textarea value={form.concerns} onChange={(event) => setValue("concerns", event.target.value)} className="min-h-28 w-full border border-white/15 bg-background px-4 py-4 text-white outline-none focus:border-primary" placeholder="Accuracy, job security, client confidentiality..." />
              </div>
            </div>
          )}

          {error && <div className="mt-7 border border-primary bg-primary/10 px-4 py-3 text-sm font-bold text-primary">{error}</div>}

          <div className="mt-8 flex justify-between gap-4">
            <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} className="border border-white/20 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-white" style={{ visibility: step === 0 ? "hidden" : "visible" }}>
              Back
            </button>
            <button type="button" disabled={status === "sending"} onClick={next} className="inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-white disabled:opacity-60">
              {status === "sending" && <Loader2 className="animate-spin" size={16} />}
              {step === steps.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </form>

        <footer className="mt-8 flex flex-wrap justify-between gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <span>2026 The Brutal Agency Corp.</span>
          <span>AI Enablement Program · Confidential</span>
        </footer>
      </div>
    </main>
  );
}
