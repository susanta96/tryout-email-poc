# 📚 Neon DB Migration Guide - Add HTML Email Support

## Overview

This guide shows you how to add an `html_body` column to store HTML email content in your Neon PostgreSQL database.

## Prerequisites

- Neon account with an existing database
- Your `DATABASE_URL` environment variable configured
- Node.js and npm installed

## Option 1: Automatic Migration (Recommended)

### Step 1: Install Dependencies

```bash
npm install tsx --save-dev
```

### Step 2: Run Migration Script

```bash
npm run migrate
```

This will:

- Add the `html_body` column to your `incoming_emails` table
- Display the updated table structure
- Show a success message

### Step 3: Verify in Neon Dashboard

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project and branch
3. Open **SQL Editor**
4. Run this query to verify:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'incoming_emails'
ORDER BY ordinal_position;
```

## Option 2: Manual Migration via Neon Console

### Step 1: Open SQL Editor

1. Log in to [Neon Console](https://console.neon.tech)
2. Navigate to your database
3. Click **SQL Editor** tab

### Step 2: Run SQL Command

Copy and paste this SQL:

```sql
-- Add html_body column for storing HTML email content
ALTER TABLE incoming_emails
ADD COLUMN IF NOT EXISTS html_body TEXT;

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'incoming_emails'
ORDER BY ordinal_position;
```

### Step 3: Execute

Click the **Execute** button or press `Ctrl+Enter`

You should see a success message and the updated table columns.

## Testing the HTML Email Feature

### Using cURL

```bash
curl -X POST http://localhost:3000/api/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "noreply@example.com",
    "subject": "Welcome!",
    "body": "Welcome to our service",
    "html_body": "<html><body><h1>Welcome!</h1><p>Thank you for joining.</p></body></html>"
  }'
```

### Using JavaScript

```javascript
const response = await fetch("/api/emails", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sender: "noreply@example.com",
    subject: "Welcome!",
    body: "Welcome to our service",
    html_body:
      "<html><body><h1>Welcome!</h1><p>Thank you for joining.</p></body></html>",
  }),
});

const data = await response.json();
console.log(data);
```

### Using Python

```python
import requests

response = requests.post(
    'http://localhost:3000/api/emails',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'sender': 'noreply@example.com',
        'subject': 'Welcome!',
        'body': 'Welcome to our service',
        'html_body': '<html><body><h1>Welcome!</h1><p>Thank you for joining.</p></body></html>',
    }
)

print(response.json())
```

## API Changes

### POST /api/emails - Request Body

Now supports optional `html_body` field:

```json
{
  "sender": "user@example.com",
  "subject": "Email Subject",
  "body": "Plain text content",
  "html_body": "<html><body>HTML content</body></html>",
  "message_id": "optional_id_for_dedup"
}
```

### GET /api/emails - Response

Responses now include `html_body`:

```json
{
  "emails": [
    {
      "id": 1,
      "message_id": null,
      "sender": "user@example.com",
      "subject": "Welcome",
      "body": "Plain text content",
      "html_body": "<html><body>HTML content</body></html>",
      "received_at": "2026-06-21T10:30:00Z"
    }
  ]
}
```

## Database Schema

### Current Table Structure

```sql
CREATE TABLE incoming_emails (
  id BIGSERIAL PRIMARY KEY,
  message_id TEXT UNIQUE,
  sender TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  html_body TEXT,  -- NEW COLUMN
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Rollback (If Needed)

If you need to remove the `html_body` column:

```sql
ALTER TABLE incoming_emails
DROP COLUMN IF EXISTS html_body;
```

## Troubleshooting

### "Column already exists" error

- This is safe! The migration uses `ADD COLUMN IF NOT EXISTS`
- Just run the migration again

### Migration script fails

```bash
# Check that DATABASE_URL is set
echo $DATABASE_URL

# Make sure it looks like:
# postgres://user:password@host/dbname
```

### Can't connect to Neon

1. Verify your DATABASE_URL in `.env.local`
2. Check that your IP is whitelisted (if applicable)
3. Test connection in Neon console first

## Next Steps

1. ✅ Run the migration: `npm run migrate`
2. 📖 Check API docs at `/docs` or `/docs/scalar`
3. 🚀 Start sending HTML emails!

## Resources

- [Neon Documentation](https://neon.tech/docs)
- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)
- [Email HTML Best Practices](https://litmus.com/blog/html-email-best-practices)

---

Built with ❤️ for Neon PostgreSQL
