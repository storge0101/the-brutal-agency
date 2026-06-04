export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var body = req.body;
  var name = body.name;
  var email = body.email;
  var phone = body.phone;
  var company = body.company;
  var budget = body.budget;
  var timeline = body.timeline;
  var services = body.services;
  var message = body.message;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in name, email, and project details.' });
  }

  var serviceList = 'None selected';
  if (services && services.length > 0) {
    serviceList = services.join(', ');
  }

  var subjectLine = 'New Project Inquiry from ' + name + ' - The Brutal Agency';

  var payload = {
    access_key: process.env.WEB3FORMS_KEY,
    subject: subjectLine,
    to: 'brrrrrr@getbrutal.ph',
    name: name,
    email: email,
    phone: phone || 'Not provided',
    company: company || 'Not provided',
    budget: budget || 'Not specified',
    timeline: timeline || 'Not specified',
    services: serviceList,
    message: message
  };

  var response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  var data = await response.json();

  if (data.success) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: 'Failed to send. Please try again.' });
  }
}
