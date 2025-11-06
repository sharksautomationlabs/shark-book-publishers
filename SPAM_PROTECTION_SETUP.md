# Spam Protection Setup Guide

## Overview
This website now includes comprehensive spam protection to prevent fake leads and automated submissions. The protection includes multiple layers of security.

## Protection Features Implemented

### 1. reCAPTCHA Integration
- **Purpose**: Prevents automated bot submissions
- **Implementation**: Google reCAPTCHA v2 with "I'm not a robot" checkbox
- **Location**: All contact forms

### 2. Rate Limiting
- **Hourly Limit**: 3 submissions per hour per browser
- **Daily Limit**: 10 submissions per day per browser
- **Minimum Delay**: 30 seconds between submissions
- **Storage**: Uses localStorage to track submissions

### 3. Honeypot Fields
- **Purpose**: Catches automated form fillers
- **Implementation**: Hidden fields that should remain empty
- **Detection**: If filled, submission is rejected

### 4. Suspicious Content Detection
- **Patterns**: Detects common spam keywords and phrases
- **Examples**: "test test", "spam", "bot", "automated", etc.
- **Action**: Rejects submissions with suspicious content

### 5. Form Validation
- **Required Fields**: Name, email, message
- **Email Format**: Basic email validation
- **Privacy Policy**: Must be accepted
- **Consent**: Must be given (Footer form only)

## Setup Instructions

### 1. Get reCAPTCHA Keys
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site
3. Choose reCAPTCHA v2 ("I'm not a robot" Checkbox)
4. Add your domain(s)
5. Get your Site Key and Secret Key

### 2. Environment Variables
Add these to your `.env.local` file:

```env
# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your_secret_key_here

# EmailJS Configuration (existing)
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 3. For Development/Testing
You can use Google's test keys for development:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

## How It Works

### User Experience
1. User fills out the form
2. Completes reCAPTCHA verification
3. System checks rate limits
4. Validates honeypot field (empty)
5. Scans for suspicious content
6. If all checks pass, email is sent
7. Submission is recorded for rate limiting

### Rate Limiting Logic
- **First Submission**: Always allowed
- **Subsequent Submissions**: 
  - Must wait 30 seconds between submissions
  - Max 3 per hour
  - Max 10 per day
- **Reset**: Limits reset automatically after time periods

### Error Messages
- **Rate Limited**: "Too many submissions. Please wait X minutes."
- **No reCAPTCHA**: "Please complete the security verification"
- **Honeypot Triggered**: "Invalid submission detected"
- **Suspicious Content**: "Suspicious content detected. Please review your message."

## Monitoring

### Check Rate Limits
You can check remaining submissions programmatically:
```javascript
import { spamProtection } from '../utils/spamProtection';

const remaining = spamProtection.getRemainingSubmissions();
console.log(`Hourly: ${remaining.hourly}, Daily: ${remaining.daily}`);
```

### Clear History (Admin)
```javascript
import { spamProtection } from '../utils/spamProtection';
spamProtection.clearHistory();
```

## Security Notes

### Client-Side Protection
- Rate limiting uses localStorage (can be cleared by users)
- Honeypot fields are hidden but can be detected
- reCAPTCHA can be bypassed by sophisticated bots

### Recommendations
1. **Server-Side Validation**: Implement API routes with server-side rate limiting
2. **IP Blocking**: Add IP-based blocking for repeated violations
3. **Email Validation**: Verify email addresses before sending
4. **Monitoring**: Set up alerts for unusual submission patterns

## Files Modified
- `app/utils/spamProtection.ts` - Core spam protection logic
- `app/components/ReCAPTCHA.tsx` - reCAPTCHA component
- `app/components/Footer.tsx` - Footer contact form
- `app/components/CurrentOffer.tsx` - Current offer form

## Testing
1. Try submitting multiple forms quickly (should be rate limited)
2. Fill the honeypot field (should be rejected)
3. Use suspicious keywords (should be rejected)
4. Skip reCAPTCHA (should be rejected)

## Troubleshooting
- **reCAPTCHA not loading**: Check site key and domain configuration
- **Rate limits not working**: Check localStorage is enabled
- **Forms not submitting**: Check all validation requirements are met
