type TnaPayload = {
  name?: string;
  email?: string;
  department?: string;
  experience?: string;
  tools_used?: string[];
  frequency?: string;
  prompt_skill?: string;
  copilot_access?: string;
  time_sinks?: string[];
  painpoint?: string;
  priorities?: string[];
  learning_style?: string;
  session_slot?: string;
  device?: string;
  success_metric?: string;
  concerns?: string;
  website?: string;
  elapsedMs?: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean)
    : [];
}

function buildSummary(payload: Required<TnaPayload>) {
  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Department: ${payload.department}`,
    `Experience: ${payload.experience || "N/A"}`,
    `Tools used: ${payload.tools_used.join(", ")}`,
    `AI frequency: ${payload.frequency}`,
    `Prompt skill: ${payload.prompt_skill}/5`,
    `Copilot access: ${payload.copilot_access}`,
    `Time sinks: ${payload.time_sinks.join(", ")}`,
    `Repetitive task: ${payload.painpoint || "N/A"}`,
    `Priorities: ${payload.priorities.join(" > ")}`,
    `Learning style: ${payload.learning_style}`,
    `Session slot: ${payload.session_slot}`,
    `Device: ${payload.device}`,
    `Success metric: ${payload.success_metric}`,
    `Concerns: ${payload.concerns || "N/A"}`,
  ].join("\n");
}

async function forwardToGoogleSheet(payload: Required<TnaPayload>) {
  const url = process.env.TNA_GOOGLE_SCRIPT_URL;
  if (!url) return false;

  const result = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    throw new Error("Google Sheets endpoint rejected the submission.");
  }

  return true;
}

async function sendWithResend(payload: Required<TnaPayload>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.TNA_RESULTS_EMAIL || "brrrrrr@getbrutal.ph";
  const from = process.env.TNA_FROM_EMAIL || "The Brutal Agency <onboarding@resend.dev>";

  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `TNA-001 Response - ${payload.name}`,
      text: buildSummary(payload),
    }),
  });

  if (!result.ok) {
    throw new Error("Resend rejected the submission.");
  }

  return true;
}

export default async function handler(request: any, response: any) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  let body: TnaPayload = {};

  try {
    body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body || {};
  } catch {
    return response.status(400).json({ error: "Invalid request body." });
  }

  const payload: Required<TnaPayload> = {
    name: asText(body.name),
    email: asText(body.email),
    department: asText(body.department),
    experience: asText(body.experience),
    tools_used: asList(body.tools_used),
    frequency: asText(body.frequency),
    prompt_skill: asText(body.prompt_skill),
    copilot_access: asText(body.copilot_access),
    time_sinks: asList(body.time_sinks),
    painpoint: asText(body.painpoint),
    priorities: asList(body.priorities),
    learning_style: asText(body.learning_style),
    session_slot: asText(body.session_slot),
    device: asText(body.device),
    success_metric: asText(body.success_metric),
    concerns: asText(body.concerns),
    website: asText(body.website),
    elapsedMs: typeof body.elapsedMs === "number" ? body.elapsedMs : Number(body.elapsedMs || 0),
  };

  if (payload.website) {
    return response.status(200).json({ ok: true });
  }

  if (payload.elapsedMs > 0 && payload.elapsedMs < 2500) {
    return response.status(200).json({ ok: true });
  }

  if (!payload.name || !emailPattern.test(payload.email) || !payload.department || !payload.success_metric) {
    return response.status(400).json({ error: "Required fields are missing." });
  }

  try {
    const [sheetSent, emailSent] = await Promise.all([
      forwardToGoogleSheet(payload),
      sendWithResend(payload),
    ]);

    if (!sheetSent && !emailSent) {
      console.log("TNA-001 submission", payload);
      return response.status(200).json({ ok: true, delivery: "vercel-log" });
    }

    return response.status(200).json({
      ok: true,
      delivery: [sheetSent ? "google-sheet" : "", emailSent ? "email" : ""].filter(Boolean),
    });
  } catch (error) {
    console.error("TNA-001 submission failed", error, payload);
    return response.status(502).json({ error: "Could not save this response. Please try again." });
  }
}
