"use client";

import { useEffect, useState } from "react";

export default function DocsPage() {
  const [spec, setSpec] = useState(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "interactive" | "examples"
  >("overview");
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    fetch("/openapi.json")
      .then((res) => res.json())
      .then(setSpec);
    setOrigin(window.location.origin);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  API Documentation
                </h1>
                <p className="text-slate-400">
                  Complete reference for the Email API
                </p>
              </div>
              <div className="text-right text-sm text-slate-400">
                <p>v1.0.0</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 flex-wrap">
              {(["overview", "interactive", "examples"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-300 bg-slate-800/50 hover:bg-slate-700/50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <a
                href="/docs/scalar"
                className="px-4 py-2 rounded-lg font-medium transition-all bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg ml-auto"
              >
                🚀 Scalar
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Endpoints", value: "2", icon: "🔌" },
                  { label: "Methods", value: "POST, GET", icon: "📨" },
                  { label: "Auth", value: "API Key", icon: "🔐" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-slate-400 text-sm mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xl font-semibold text-white">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Introduction */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Getting Started
                </h2>
                <p className="text-slate-300 mb-6">
                  The Email API allows you to create and retrieve email records
                  with automatic deduplication and pagination support. All
                  endpoints require authentication using an API key.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Authentication
                    </h3>
                    <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300">
                      Authorization: Bearer YOUR_API_KEY
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Base URL
                    </h3>
                    <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300">
                      {origin || "http://localhost:3000"}/api
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Response Format
                    </h3>
                    <p className="text-slate-300 mb-3">
                      All responses are in JSON format with appropriate HTTP
                      status codes.
                    </p>
                    <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-auto">
                      {`{
  "success": true,
  "data": { /* response data */ }
}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Endpoints Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Endpoints</h2>

                {[
                  {
                    method: "POST",
                    path: "/emails",
                    description: "Create a new email record",
                    color: "from-green-500 to-green-600",
                  },
                  {
                    method: "GET",
                    path: "/emails",
                    description: "Retrieve paginated email list",
                    color: "from-blue-500 to-blue-600",
                  },
                ].map((endpoint) => (
                  <div
                    key={endpoint.method + endpoint.path}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`bg-gradient-to-r ${endpoint.color} px-4 py-2 rounded-lg font-semibold text-white min-w-fit`}
                      >
                        {endpoint.method}
                      </div>
                      <code className="font-mono text-lg text-slate-300">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="text-slate-400">{endpoint.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Tab */}
          {activeTab === "interactive" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Interactive API Explorer
              </h2>

              {/* POST Endpoint */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 px-3 py-1 rounded font-semibold text-white text-sm">
                    POST
                  </div>
                  <h3 className="text-2xl font-bold text-white">/emails</h3>
                </div>

                <p className="text-slate-300 mb-6">
                  Create a new email record with automatic deduplication.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Request Body
                    </label>
                    <textarea
                      defaultValue={JSON.stringify(
                        {
                          sender: "user@example.com",
                          subject: "Hello World",
                          body: "This is a test email",
                        },
                        null,
                        2,
                      )}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-slate-300 font-mono text-sm focus:border-blue-500 outline-none transition-colors min-h-32"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Required Headers
                    </label>
                    <div className="bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300">
                      <div>Authorization: Bearer YOUR_API_KEY</div>
                      <div>Content-Type: application/json</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Expected Response (201)
                    </label>
                    <pre className="bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-auto">
                      {JSON.stringify(
                        {
                          success: true,
                          email: {
                            id: 1,
                            sender: "user@example.com",
                            subject: "Hello World",
                            received_at: "2026-06-21T10:30:00Z",
                          },
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </div>
              </div>

              {/* GET Endpoint */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 rounded font-semibold text-white text-sm">
                    GET
                  </div>
                  <h3 className="text-2xl font-bold text-white">/emails</h3>
                </div>

                <p className="text-slate-300 mb-6">
                  Retrieve a paginated list of emails sorted by most recent
                  first.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Query Parameters
                    </label>
                    <div className="space-y-2">
                      <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 font-mono text-sm text-slate-300">
                        <div className="font-semibold text-blue-400 mb-1">
                          limit (optional)
                        </div>
                        <div className="text-slate-400">
                          Maximum results (default: 50, max: 100)
                        </div>
                      </div>
                      <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 font-mono text-sm text-slate-300">
                        <div className="font-semibold text-blue-400 mb-1">
                          offset (optional)
                        </div>
                        <div className="text-slate-400">
                          Number of results to skip (default: 0)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Example URL
                    </label>
                    <div className="bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300 break-all">
                      /api/emails?limit=50&offset=0
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Expected Response (200)
                    </label>
                    <pre className="bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-auto">
                      {JSON.stringify(
                        {
                          emails: [
                            {
                              id: 1,
                              message_id: null,
                              sender: "john@example.com",
                              subject: "Welcome",
                              body: "Email content...",
                              received_at: "2026-06-21T10:30:00Z",
                            },
                          ],
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Examples Tab */}
          {activeTab === "examples" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Code Examples
              </h2>

              {/* JavaScript */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-yellow-400">📝</span> JavaScript / Fetch
                </h3>
                <div className="relative">
                  <pre className="bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-auto">
                    {`// Create email
const response = await fetch('/api/emails', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sender: 'user@example.com',
    subject: 'Test Email',
    body: 'This is a test',
  }),
});

const data = await response.json();
console.log(data);

// Get emails
const getResponse = await fetch('/api/emails?limit=10&offset=0', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});

const emails = await getResponse.json();
console.log(emails.emails);`}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `// Create email
const response = await fetch('/api/emails', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sender: 'user@example.com',
    subject: 'Test Email',
    body: 'This is a test',
  }),
});

const data = await response.json();
console.log(data);

// Get emails
const getResponse = await fetch('/api/emails?limit=10&offset=0', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});

const emails = await getResponse.json();
console.log(emails.emails);`,
                      )
                    }
                    className="absolute top-4 right-4 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* cURL */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🔧</span> cURL
                </h3>
                <div className="relative">
                  <pre className="bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-auto">
                    {`# Create email
curl -X POST http://localhost:3000/api/emails \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sender": "user@example.com",
    "subject": "Test Email",
    "body": "This is a test"
  }'

# Get emails
curl -X GET "http://localhost:3000/api/emails?limit=10&offset=0" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `# Create email
curl -X POST http://localhost:3000/api/emails \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sender": "user@example.com",
    "subject": "Test Email",
    "body": "This is a test"
  }'

# Get emails
curl -X GET "http://localhost:3000/api/emails?limit=10&offset=0" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
                      )
                    }
                    className="absolute top-4 right-4 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Python */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-blue-400">🐍</span> Python
                </h3>
                <div className="relative">
                  <pre className="bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-auto">
                    {`import requests

# Create email
response = requests.post(
    'http://localhost:3000/api/emails',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'sender': 'user@example.com',
        'subject': 'Test Email',
        'body': 'This is a test',
    }
)

print(response.json())

# Get emails
get_response = requests.get(
    'http://localhost:3000/api/emails?limit=10&offset=0',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
)

print(get_response.json())`}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `import requests

# Create email
response = requests.post(
    'http://localhost:3000/api/emails',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    },
    json={
        'sender': 'user@example.com',
        'subject': 'Test Email',
        'body': 'This is a test',
    }
)

print(response.json())

# Get emails
get_response = requests.get(
    'http://localhost:3000/api/emails?limit=10&offset=0',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
)

print(get_response.json())`,
                      )
                    }
                    className="absolute top-4 right-4 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Error Handling */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>⚠️</span> Error Handling
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 mb-2">
                      <div className="font-semibold text-red-400 mb-1">
                        401 Unauthorized
                      </div>
                      <div className="text-slate-300 text-sm">
                        Missing or invalid API key
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-2">
                      <div className="font-semibold text-yellow-400 mb-1">
                        400 Bad Request
                      </div>
                      <div className="text-slate-300 text-sm">
                        Missing required fields (sender, subject, body)
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3 mb-2">
                      <div className="font-semibold text-green-400 mb-1">
                        200 OK (Duplicate)
                      </div>
                      <div className="text-slate-300 text-sm">
                        Duplicate message_id detected and skipped
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-md mt-20 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
            <p>
              Email API Documentation © 2026 • Built with Next.js & Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
