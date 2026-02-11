---
description: Deploy an AI-powered email auto-reply system using Vercel, Resend, Zoho Mail, GitHub Models API, and Activepieces
---

# AI Email Auto-Reply Workflow

Automated pipeline that watches a Zoho Mail inbox via Activepieces, sends email data to a Vercel serverless endpoint, generates an AI reply via GitHub Models API, and sends it back via Resend.

## Architecture (Proven & Tested)

```
Client Email → Zoho Mail Inbox
                    ↓
            Activepieces (Trigger: New Email)
                    ↓
            Router (Spam Filter)
                    ↓
            POST /api/email-reply (Vercel Serverless)
                    ↓
            GitHub Models API (gpt-4o-mini) → Generate Reply
                    ↓
            Resend API → Send Reply to Client
```

## Prerequisites

- **Zoho Mail** account with custom domain
- **Resend** account with verified sending subdomain (e.g. `resend.yourdomain.com`)
- **GitHub** account with access to GitHub Models (marketplace/models)
- **Activepieces** cloud account (free tier)
- **Vercel** project (free tier)

## Step 1: Install Resend SDK

```bash
npm install resend
```

Remove `nodemailer` if present:
```bash
npm uninstall nodemailer
```

## Step 2: Create Serverless Endpoint

Create `api/email-reply.js` in your project root:

```javascript
const { Resend } = require('resend');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { from, subject, body } = req.body;

    if (!from || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate AI reply via GitHub Models API
    const aiResponse = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_PAT}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional email assistant. Write polite, clear replies. Format as HTML paragraphs.'
          },
          {
            role: 'user',
            content: `Reply to this email:\n\nFrom: ${from}\nSubject: ${subject}\n\n${body}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      return res.status(502).json({ error: 'AI service error', details: errText });
    }

    const aiData = await aiResponse.json();
    const aiReply = aiData.choices?.[0]?.message?.content;

    if (!aiReply) {
      return res.status(502).json({ error: 'AI generated empty response' });
    }

    // Send via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailResult = await resend.emails.send({
      from: `Your Name <sender@resend.yourdomain.com>`,
      to: from,
      subject: `Re: ${subject}`,
      html: aiReply
    });

    if (emailResult.error) {
      return res.status(502).json({ error: 'Email failed', details: emailResult.error });
    }

    return res.status(200).json({ success: true, emailId: emailResult.data?.id });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
```

## Step 3: Environment Variables

Set these in **Vercel Dashboard → Settings → Environment Variables** AND in `.env.local`:

```
RESEND_API_KEY=re_your_resend_api_key
GITHUB_PAT=github_pat_your_token_here
CONTACT_EMAIL=your-email@yourdomain.com
WEBHOOK_SECRET=your-random-secret-string
```

## Step 4: Resend Domain Setup

1. Go to [resend.com/domains](https://resend.com/domains)
2. Add your subdomain (e.g. `resend.yourdomain.com`)
3. Add the DNS records Resend provides
4. Wait for "Verified" status
5. Use `sender@resend.yourdomain.com` as the `from` address

## Step 5: GitHub Models Access

1. Go to [github.com/marketplace/models](https://github.com/marketplace/models)
2. Click on `gpt-4o-mini` → Accept terms
3. Generate a Personal Access Token at [github.com/settings/tokens](https://github.com/settings/tokens)
4. Use this as `GITHUB_PAT`

## Step 6: Activepieces Flow Setup

### Trigger: Zoho Mail → New Email Received
- Connect Zoho account via OAuth (requires Zoho API Console app)
- Watch the Inbox folder

### Step: Router (Spam Filter)
Add conditions (all must be true):
- `fromAddress` **(Text) Does not exactly match** `your-email@yourdomain.com`
- `fromAddress` **(Text) Does not contain** `noreply`
- `summary` **(Number) Greater than** `10` (content length)
- `subject` **(Text) Does not contain** `Delivery Status Notification`

### Step: Send HTTP Request (inside Branch 1)
- **Method**: `POST`
- **URL**: `https://yourdomain.vercel.app/api/email-reply`
- **Headers**:
  - `Content-Type` → `application/json`
  - `Authorization` → `Bearer your-random-secret-string`
- **Body Type**: JSON
- **Body**:
```json
{
  "from": "{{ trigger.fromAddress }}",
  "subject": "{{ trigger.subject }}",
  "body": "{{ trigger.summary }}"
}
```

### Zoho API Console Setup (for Activepieces OAuth)
1. Go to [api-console.zoho.com](https://api-console.zoho.com)
2. Add Client → Server-based Application
3. Redirect URI: `https://cloud.activepieces.com/redirect`
4. Copy Client ID and Client Secret into Activepieces

## Step 7: Deploy & Publish

```bash
git add . && git commit -m "feat: add AI email auto-reply" && git push
```

Then click **Publish** in Activepieces.

## Verified Free Tier Limits

| Service | Free Limit |
|---------|-----------|
| Vercel | 100 GB bandwidth/month |
| Resend | 3,000 emails/month |
| GitHub Models | ~150 requests/day (gpt-4o-mini) |
| Activepieces | 1,000 tasks/month |
| Zoho Mail | Unlimited inbox (no SMTP/IMAP) |

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| 405 Method Not Allowed | Wrong URL (missing `/api/email-reply`) | Add full path |
| 401 Unauthorized | Wrong webhook secret | Match secret in Vercel env and Activepieces header |
| 502 AI service error | Invalid GitHub PAT | Regenerate token, accept Models terms |
| 502 Email failed | Unverified domain | Verify correct subdomain on Resend |
| ERR_INVALID_HTTP_TOKEN | Colon in header name | Remove trailing `:` from header names in Activepieces |
