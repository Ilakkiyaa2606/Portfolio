# EmailJS Setup Guide

This portfolio uses EmailJS to send contact form emails. Follow these steps to set up email functionality.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com)
2. Click **Sign Up** and create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. After logging in, go to **Email Services** in the sidebar
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your selected provider
5. Copy your **Service ID** (looks like: `service_xxxxxxxxx`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the sidebar
2. Click **Create New Template**
3. Give it a name (e.g., "Contact Form")
4. Use the template variables:

```
From: {{from_name}} ({{from_email}})
Phone: {{phone}}
Project Type: {{project_type}}

Message:
{{message}}
```

5. Click **Save**
6. Copy your **Template ID** (looks like: `template_xxxxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxxxxx`)

## Step 5: Configure the Contact Component

In `src/components/Contact.tsx`, find line 102-105 and replace the placeholder values:

```typescript
// Initialize EmailJS (replace with your public key)
emailjs.init('YOUR_PUBLIC_KEY')

const templateParams = {
  to_email: 'your-email@example.com', // Replace with your email
  from_name: formData.name,
  from_email: formData.email,
  phone: formData.phone,
  project_type: projectTypes.find((p) => p.value === formData.projectType)?.label || formData.projectType,
  message: formData.message,
}

await emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your Email Service ID
  'YOUR_TEMPLATE_ID', // Replace with your Email Template ID
  templateParams
)
```

Replace:
- `YOUR_PUBLIC_KEY` → Your Public Key from Step 4
- `your-email@example.com` → Your email address where you want to receive messages
- `YOUR_SERVICE_ID` → Your Service ID from Step 2
- `YOUR_TEMPLATE_ID` → Your Template ID from Step 3

## Step 6: Test the Form

1. Run the development server: `npm run dev`
2. Scroll to the Contact section
3. Fill out the form and submit
4. Check your email for the received message

## Troubleshooting

### "Invalid Service ID" or "Invalid Template ID"
- Double-check that you copied the IDs correctly
- Make sure there are no extra spaces

### Email not sending
- Check your EmailJS quota (free tier has limits)
- Verify your email service credentials were set up correctly
- Check browser console for error messages

### "429 Too Many Requests"
- You've exceeded the free tier rate limit
- Upgrade your EmailJS plan or wait for the limit to reset

## Security Note

Your Public Key is safe to expose in frontend code. However, never commit sensitive credentials other than the public key to version control.

For production:
- Use environment variables to store the IDs
- Never commit `.env` files with real credentials
- Consider implementing a backend server to send emails instead
