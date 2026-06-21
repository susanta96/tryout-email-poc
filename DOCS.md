# 📚 API Documentation

Your beautiful, modern API documentation is ready! Access it at:

- **Main Docs**: `http://localhost:3000/docs`
- **Scalar Explorer**: `http://localhost:3000/docs/scalar` ⭐ NEW
- **Quick Reference**: `http://localhost:3000/docs/quick-ref`
- **OpenAPI Spec**: `http://localhost:3000/api/docs/openapi`

## Features

✨ **Beautiful UI** - Modern gradient design with smooth animations
🎯 **Interactive** - Test endpoints directly from the browser
📖 **Comprehensive** - Full endpoint documentation with examples
⚡ **Quick Reference** - Fast lookup for common tasks
📊 **OpenAPI Spec** - Standard OpenAPI 3.1 compliant specification

## What's Included

### Main Documentation Page (`/docs`)

- **Overview Tab**: Introduction, authentication, base URL info
- **Interactive Tab**: Request/response examples for all endpoints
- **Examples Tab**: Code samples in JavaScript, cURL, and Python

### Quick Reference (`/docs/quick-ref`)

- Authentication format
- Base URL
- Endpoint parameters
- HTTP status codes
- Common errors & solutions

### Endpoints Documented

#### POST /api/emails

Create a new email record with automatic deduplication

**Required Fields:**

- `sender` - Email address of the sender
- `subject` - Email subject line
- `body` - Email content

**Optional Fields:**

- `message_id` - For deduplication

#### GET /api/emails

Retrieve paginated list of emails

**Query Parameters:**

- `limit` - Max results (1-100, default: 50)
- `offset` - Skip N results (default: 0)

## Architecture

```
app/
├── docs/
│   ├── page.tsx              # Main documentation page (3 tabs)
│   ├── quick-ref/
│   │   └── page.tsx          # Quick reference page
│   └── layout.tsx            # Docs layout wrapper
├── api/
│   └── docs/
│       └── openapi/
│           └── route.ts      # OpenAPI spec endpoint
public/
└── openapi.json              # Static OpenAPI spec
```

## Design Features

🎨 **Tailwind CSS** - Fully responsive, modern styling
🌓 **Dark Mode** - Eye-friendly dark theme with gradients
💫 **Animations** - Smooth transitions and hover effects
📱 **Mobile Responsive** - Works beautifully on all devices
🎯 **Accessibility** - Semantic HTML, good contrast ratios

## Environment Setup

Ensure your `.env.local` has:

```
API_KEY=your_api_key_here
```

## Next Steps

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3000/docs`
3. Use the interactive documentation to test endpoints
4. Copy code examples for your own projects

---

Built with ❤️ using Next.js 16 + TypeScript + Tailwind CSS
