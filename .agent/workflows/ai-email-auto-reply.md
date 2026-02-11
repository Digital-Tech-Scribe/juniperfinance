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

**New:** The website contact form now sends an **Instant Auto-Reply** immediately upon submission, separate from the AI pipeline.

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

## Step 2: Create Serverless Endpoints

### 1. AI Auto-Reply Endpoint (`api/email-reply.js`)
(See previous skill file content for full code - this remains the same)

### 2. Contact Form Endpoint (`api/contact.js`)
Updated to send **two** emails in parallel:
1. Admin Notification (to you)
2. Instant Auto-Reply (to client)

```javascript
// ... imports and validation ...

    // --- Email 1: Notification to Business ---
    const adminEmailPromise = resend.emails.send({
      from: 'Juniper Broz <sender@resend.yourdomain.com>',
      to: contactEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `...`
    });

    // --- Email 2: Instant Auto-Reply to Client ---
    const clientReplyPromise = resend.emails.send({
      from: 'Juniper Broz <sender@resend.yourdomain.com>',
      to: email,
      subject: `Thank you for contacting Juniper Broz`,
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for reaching out... We will get back to you shortly.</p>
      `
    });

    await Promise.all([adminEmailPromise, clientReplyPromise]);
```

## Step 3: Deployment & Configuration

(Follow standard deployment steps: Env Vars, Resend Domain, etc.)

## PRO TIP: Stopping the AI from Replying
Since Activepieces triggers on "New Email in Inbox", if you reply to a client manually:
1. **Reply** to the email in Zoho.
2. **Move the email** out of the Inbox (e.g., to "Archive" or a "Processed" folder).
3. Do this before the next Activepieces polling cycle (every 5-15 mins).

This ensures the AI never sees the email in the Inbox and won't double-reply.

## Troubleshooting
(Same table as before)
