export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  var b = req.body;
  if (!b.name || !b.email || !b.message) {
    return res.status(400).json({ error: 'Please fill in name, email, and project details.' });
  }
  var r = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_KEY,
      subject: 'New Inquiry from ' + b.name,
      to: 'brrrrrr@getbrutal.ph',
      name: b.name,
      email: b.email,
      phone: b.phone || '',
      company: b.company || '',
      budget: b.budget || '',
      timeline: b.timeline || '',
      services: b.services ? b.services.join(', ') : '',
      message: b.message
    })
  });
  var d = await r.json();
  if (d.success) {
    return res.status(200).json({ success: true });
  }
  return res.status(500).json({ error: 'Failed to send.' });
}
