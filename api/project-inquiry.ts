import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, company, budget, timeline, services, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in name, email, and project details.' });
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_KEY,
      subject: `New Project Inquiry from ${name} — The Brutal Agency`,
      to: 'brrrrrr@getbrutal.ph',
      name,
      email,
      phone: phone || 'Not provided',
      company: company || 'Not provided',
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      services: services?.join(', ') || 'None selected',
      message,
    }),
  });

  const data = await response.json();

  if (data.success) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: 'Failed to send. Please try again.' });
  }
}
