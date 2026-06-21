"use client";

import { useEffect, useState } from "react";

export default function QuickReferencePage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            API Quick Reference
          </h1>
          <p className="text-xl text-slate-400">Fast lookup for common tasks</p>
        </header>

        {/* Grid of quick refs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Authentication */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              🔐 <span>Authentication</span>
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-400 mb-2">Header Format:</p>
                <code className="block bg-slate-900 border border-slate-600 rounded p-2 text-sm font-mono text-blue-300">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">
                  Where to get your API Key:
                </p>
                <p className="text-slate-300">
                  Check your environment variables in{" "}
                  <code className="bg-slate-900 px-2 py-1 rounded text-sm">
                    .env.local
                  </code>
                </p>
              </div>
            </div>
          </div>

          {/* Base URL */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              🌐 <span>Base URL</span>
            </h3>
            <code className="block bg-slate-900 border border-slate-600 rounded p-3 text-sm font-mono text-green-300 break-all">
              {origin || "http://localhost:3000"}/api
            </code>
            <p className="text-slate-400 text-sm mt-3">
              All endpoints are relative to this base URL
            </p>
          </div>

          {/* POST Endpoint */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-green-500 px-2 py-1 rounded font-mono text-sm">
                POST
              </span>{" "}
              <span>/emails</span>
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-slate-300 mb-2">
                  Required Fields:
                </p>
                <ul className="space-y-1 text-slate-400 text-sm">
                  <li>
                    ✓ <code className="bg-slate-900 px-1 rounded">sender</code>{" "}
                    - email address
                  </li>
                  <li>
                    ✓ <code className="bg-slate-900 px-1 rounded">subject</code>{" "}
                    - email title
                  </li>
                  <li>
                    ✓ <code className="bg-slate-900 px-1 rounded">body</code> -
                    email content
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-300 mb-2">
                  Optional Fields:
                </p>
                <ul className="space-y-1 text-slate-400 text-sm">
                  <li>
                    ○{" "}
                    <code className="bg-slate-900 px-1 rounded">
                      message_id
                    </code>{" "}
                    - for dedup
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* GET Endpoint */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-blue-500 px-2 py-1 rounded font-mono text-sm">
                GET
              </span>{" "}
              <span>/emails</span>
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-slate-300 mb-2">
                  Query Parameters:
                </p>
                <ul className="space-y-1 text-slate-400 text-sm">
                  <li>limit (0-100, default: 50)</li>
                  <li>offset (default: 0)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-300 mb-2">
                  Example:
                </p>
                <code className="block bg-slate-900 px-2 py-1 rounded text-xs font-mono text-yellow-300">
                  /emails?limit=25&offset=0
                </code>
              </div>
            </div>
          </div>

          {/* Status Codes */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              📊 <span>HTTP Status Codes</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">200 OK</span>
                <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                  Success
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">201 Created</span>
                <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs">
                  Success
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">400 Bad Request</span>
                <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded text-xs">
                  Error
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">401 Unauthorized</span>
                <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded text-xs">
                  Error
                </span>
              </div>
            </div>
          </div>

          {/* Content Type */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              📝 <span>Content Type</span>
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-400 mb-2">Request:</p>
                <code className="block bg-slate-900 px-2 py-1 rounded text-sm font-mono text-purple-300">
                  application/json
                </code>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-2">Response:</p>
                <code className="block bg-slate-900 px-2 py-1 rounded text-sm font-mono text-purple-300">
                  application/json
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Common Errors */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            ⚠️ Common Errors & Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">
                401 Unauthorized
              </h4>
              <p className="text-sm text-slate-300">
                Missing or invalid API key in Authorization header
              </p>
            </div>
            <div className="bg-yellow-900/10 border border-yellow-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-400 mb-2">
                400 Bad Request
              </h4>
              <p className="text-sm text-slate-300">
                Missing required fields: sender, subject, body
              </p>
            </div>
            <div className="bg-green-900/10 border border-green-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">
                200 Duplicate Email
              </h4>
              <p className="text-sm text-slate-300">
                Same message_id already exists (deduplication)
              </p>
            </div>
            <div className="bg-blue-900/10 border border-blue-700/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">
                Network Error
              </h4>
              <p className="text-sm text-slate-300">
                Check your base URL and make sure server is running
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <a
            href="/docs"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            ← Back to Full Docs
          </a>
          <a
            href="/docs/scalar"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            🚀 Try Scalar Explorer
          </a>
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-400 border-t border-slate-700 pt-8">
          <p>Need help? Check the full documentation or contact support</p>
        </footer>
      </div>
    </div>
  );
}
