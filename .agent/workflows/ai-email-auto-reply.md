---
description: Deploy an AI-powered email auto-reply system using Vercel, Resend, Zoho Mail, GitHub Models API, and Activepieces
---

# AI Email Auto-Reply & Smart Contact Workflow

A professional automation pipeline designed for **Juniper Broz Investment Services**. It handles both incoming direct emails and website contact form submissions with AI intelligence and spam protection.

## Architecture

### 1. Direct Email Pipeline
```
Client Email → Zoho Mail Inbox
                    ↓
            Activepieces (Trigger: New Email)
                    ↓
            Filter (Spam / Internal)
                    ↓
            Vercel Endpoint (POST /api/email-reply)
                    ↓
            Redis (Rate Limit Check: 24h)
                    ↓
            GitHub Models API (gpt-4o-mini)
                    ↓
            Resend API → Send AI Reply to Client
```

### 2. Website Contact Form Pipeline
```
Client Submission → Vercel Endpoint (POST /api/contact)
                    ↓
            Redis (Rate Limit Check: 3-min cooldown)
                    ↓
        [PARALLEL EXECUTION]
        - Resend API (Admin Notification)
        - Zoho SMTP/NodeMailer (Instant Auto-Reply)
```

## Integration Details

| Service | Component | Purpose |
| :--- | :--- | :--- |
| **Vercel** | Serverless Functions | Hosts logic for `/api/contact` and `/api/email-reply`. |
| **Zoho Mail** | Business Email | The primary domain inbox and SMTP provider for instant replies. |
| **Resend** | Email Delivery | Primary SDK for sending high-priority notifications and AI replies. |
| **GitHub API** | gpt-4o-mini | The "Brain" that generates professional, context-aware responses. |
| **Redis** | Rate Limiter | Prevents spam loops and brute-force form submissions. |
| **Activepieces**| No-Code Workflow | The glue connecting Zoho Mail to our Vercel Backend. |

## Key Logic Implementations

### Smart Parsing
The `/api/email-reply` endpoint detects if an email is a "Notification" from your own system. It automatically pulls out the client's information from the message body so the AI replies to the **Client**, not to you.

### Quota Safety
To save Resend quota (free tier limits):
- **Notification emails** use Resend (for reliability).
- **Auto-responses** use Zoho SMTP via NodeMailer (infinite free sends).

### Rate Limiting (Redis)
- **Direct Mail:** 1 AI reply per 24 hours per unique email address.
- **Form Submission:** 3-minute waiting period per user before they can resubmit.

## Client-Side UI (Mobile Excellence)
- **Input Scaling:** All forms use `16px` (`text-base`) fonts on mobile to prevent iOS "Auto-Zoom" bugs.
- **Success Overlay:** A full-screen success message with a 5s countdown timer and automatic home redirection.

## Deployment Checklist
1. **GitHub PAT:** Create a token with access to GitHub Marketplace/Models.
2. **Resend Key:** Verify your domain/subdomain on Resend.
3. **Redis URL:** Copy the connection string from your Redis provider to Vercel.
4. **Zoho App Password:** Use a dedicated App Password (not your main login) for NodeMailer.

---
**Status:** ✅ Fully Implemented and Documented
