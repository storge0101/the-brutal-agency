type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asServices(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export default async function handler(request: any, response: any) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  let payload: InquiryPayload = {};

  try {
    payload =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body || {};
  } catch {
    return response.status(400).json({ error: "Invalid request body." });
  }

  const name = asText(payload.name);
  const email = asText(payload.email);
  const phone = asText(payload.phone);
  const company = asText(payload.company);
  const budget = asText(payload.budget);
  const timeline = asText(payload.timeline);
  const message = asText(payload.message);
  const services = asServices(payload.services);

  if (!name || !email || !message) {
    return response
      .status(400)
      .json({ error: "Name, email, and project details are required." });
  }

  if (!emailPattern.test(email)) {
    return response
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return response
      .status(500)
      .json({ error: "Lead backend is not configured yet." });
  }

  try {
    const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New Brutal Agency project inquiry",
        from_name: "The Brutal Agency Website",
        name,
        email,
        phone,
        company,
        budget,
        timeline,
        services: services.join(", "),
        message,
      }),
    });

    const result = await web3FormsResponse.json().catch(() => ({}));

    if (!web3FormsResponse.ok || result.success === false) {
      return response.status(502).json({
        error:
          result.message ||
          "Could not send your inquiry. Please check the Web3Forms access key.",
      });
    }
  } catch {
    return response
      .status(502)
      .json({ error: "Could not reach the form email service." });
  }

  return response.status(200).json({ ok: true });
}
