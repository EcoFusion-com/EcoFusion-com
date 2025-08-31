import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import Mailjet from 'node-mailjet';

const app = express();
const PORT = process.env.PORT || 8787;

// CORS
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

app.use(express.json());

// Rate limits
const newsletterLimiter = rateLimit({ windowMs: 60_000, max: 10 });
const contactLimiter = rateLimit({ windowMs: 60_000, max: 3 });

// Mailjet client
const MJ_API_KEY = process.env.MJ_API_KEY || process.env.MAILJET_API_KEY || '';
const MJ_API_SECRET = process.env.MJ_API_SECRET || process.env.MAILJET_API_SECRET || '';
const MJ_SENDER = process.env.MJ_SENDER || process.env.CONTACT_FROM_EMAIL || '';
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || MJ_SENDER;

if (!MJ_API_KEY || !MJ_API_SECRET) {
  // eslint-disable-next-line no-console
  console.warn('[server] Mailjet keys are not set; newsletter/contact will fail.');
}

const mailjet = Mailjet.apiConnect(MJ_API_KEY, MJ_API_SECRET);

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Newsletter signup: add/update contact to a list
app.post('/api/newsletter', newsletterLimiter, async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email || typeof email !== 'string' || !isEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' });
    }
    const listId = process.env.MJ_LIST_ID || '';
    if (!listId) {
      return res.status(500).json({ ok: false, error: 'Newsletter list not configured' });
    }

    // Create or update contact
    await mailjet
      .post('contacts', { version: 'v3' })
      .request({ Email: email });

    // Manage list subscription
    await mailjet
      .post('listrecipient', { version: 'v3' })
      .request({ Action: 'addforce', Email: email, ListID: Number(listId) });

    return res.json({ ok: true });
  } catch (err: any) {
    if (err && err.statusCode === 400) {
      return res.status(409).json({ ok: false, error: 'Already subscribed' });
    }
    // eslint-disable-next-line no-console
    console.error('[newsletter] error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Contact submit: send email via Mailjet
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, company, projectType, message } = req.body || {};
    if (!firstName || !lastName || !email || !projectType || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email' });
    }
    if (!MJ_SENDER || !CONTACT_TO_EMAIL) {
      return res.status(500).json({ ok: false, error: 'Email sender/recipient not configured' });
    }

    const subject = `Eco Fusion contact: ${firstName} ${lastName} (${projectType})`;
    const text = `Name: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${company || '-'}\nProject: ${projectType}\n\nMessage:\n${message}`;

    await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: { Email: MJ_SENDER },
            To: [{ Email: CONTACT_TO_EMAIL }],
            Subject: subject,
            TextPart: text,
          },
        ],
      });

    return res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] listening on http://localhost:${PORT}`);
});
