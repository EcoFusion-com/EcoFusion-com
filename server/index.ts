import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import Mailjet from 'node-mailjet';
import { validateContactForm, validateNewsletterForm, sanitizeTextInput } from './validation';

// Environment configuration
const PORT = process.env.PORT || 8787;
const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'];
const MJ_API_KEY = process.env.MJ_API_KEY || process.env.MAILJET_API_KEY || '';
const MJ_API_SECRET = process.env.MJ_API_SECRET || process.env.MAILJET_API_SECRET || '';
const MJ_SENDER = process.env.MJ_SENDER || process.env.CONTACT_FROM_EMAIL || '';
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || MJ_SENDER;
const MJ_LIST_ID = process.env.MJ_LIST_ID || '';

const app = express();

// CORS configuration for production
app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (CORS_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    
    // In development, allow localhost with any port
    if (process.env.NODE_ENV === 'development' && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Rate limits
const newsletterLimiter = rateLimit({ 
  windowMs: 60_000, 
  max: parseInt(process.env.RATE_LIMIT_NEWSLETTER || '10'),
  message: 'Too many newsletter requests, please try again later.'
});
const contactLimiter = rateLimit({ 
  windowMs: 60_000, 
  max: parseInt(process.env.RATE_LIMIT_CONTACT || '3'),
  message: 'Too many contact requests, please try again later.'
});

// Validate required environment variables
if (!MJ_API_KEY || !MJ_API_SECRET) {
  console.warn('[server] Mailjet keys are not set; newsletter/contact will fail.');
}

if (!MJ_LIST_ID) {
  console.warn('[server] MJ_LIST_ID not set; newsletter signup will fail.');
}

const mailjet = Mailjet.apiConnect(MJ_API_KEY, MJ_API_SECRET);


// Newsletter signup: add/update contact to a list
app.post('/api/newsletter', newsletterLimiter, async (req, res) => {
  try {
    const validation = validateNewsletterForm(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }
    
    const { email } = req.body;
    if (!MJ_LIST_ID) {
      return res.status(500).json({ ok: false, error: 'Newsletter list not configured' });
    }

    // Create or update contact
    await mailjet
      .post('contacts', { version: 'v3' })
      .request({ Email: email });

    // Manage list subscription
    await mailjet
      .post('listrecipient', { version: 'v3' })
      .request({ Action: 'addforce', Email: email, ListID: Number(MJ_LIST_ID) });

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
    const validation = validateContactForm(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }
    
    const { firstName, lastName, email, company, projectType, message } = req.body;
    
    // Sanitize inputs
    const sanitizedData = {
      firstName: sanitizeTextInput(firstName, 50),
      lastName: sanitizeTextInput(lastName, 50),
      email: email.trim(),
      company: company ? sanitizeTextInput(company, 100) : '',
      projectType: sanitizeTextInput(projectType, 100),
      message: sanitizeTextInput(message, 2000)
    };
    if (!MJ_SENDER || !CONTACT_TO_EMAIL) {
      return res.status(500).json({ ok: false, error: 'Email sender/recipient not configured' });
    }

    const subject = `Eco Fusion contact: ${sanitizedData.firstName} ${sanitizedData.lastName} (${sanitizedData.projectType})`;
    const text = `Name: ${sanitizedData.firstName} ${sanitizedData.lastName}\nEmail: ${sanitizedData.email}\nCompany: ${sanitizedData.company || '-'}\nProject: ${sanitizedData.projectType}\n\nMessage:\n${sanitizedData.message}`;

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

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      mailjet: !!(MJ_API_KEY && MJ_API_SECRET),
      newsletter: !!MJ_LIST_ID
    }
  });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server] Error:', err);
  res.status(500).json({ 
    ok: false, 
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
  console.log(`[server] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[server] CORS origins: ${CORS_ORIGINS.join(', ')}`);
});
