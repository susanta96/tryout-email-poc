"use client";

import { useEffect, useState } from "react";

interface Endpoint {
  method: string;
  path: string;
  summary: string;
  description: string;
  parameters?: Array<{
    name: string;
    in: string;
    description: string;
    required?: boolean;
    schema?: any;
  }>;
  requestBody?: any;
  responses?: any;
  security?: any[];
}

export default function ScalarPage() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(
    null,
  );
  const [spec, setSpec] = useState<any>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch("/openapi.json")
      .then((res) => res.json())
      .then((data) => {
        setSpec(data);
        // Extract endpoints
        const extractedEndpoints: Endpoint[] = [];
        Object.entries(data.paths || {}).forEach(
          ([path, methods]: [string, any]) => {
            Object.entries(methods).forEach(
              ([method, details]: [string, any]) => {
                if (!["parameters", "servers"].includes(method)) {
                  extractedEndpoints.push({
                    method: method.toUpperCase(),
                    path,
                    summary: details.summary || "API Endpoint",
                    description: details.description || "",
                    parameters: details.parameters,
                    requestBody: details.requestBody,
                    responses: details.responses,
                    security: details.security,
                  });
                }
              },
            );
          },
        );
        setEndpoints(extractedEndpoints);
        if (extractedEndpoints.length > 0) {
          setSelectedEndpoint(extractedEndpoints[0]);
        }
      });
  }, []);

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "from-blue-500 to-blue-600";
      case "POST":
        return "from-green-500 to-green-600";
      case "PUT":
        return "from-yellow-500 to-yellow-600";
      case "DELETE":
        return "from-red-500 to-red-600";
      case "PATCH":
        return "from-purple-500 to-purple-600";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div
          className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-slate-900/50 backdrop-blur border-r border-slate-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📡</span>
              <h1 className="text-xl font-bold text-white">API Explorer</h1>
            </div>
            <p className="text-xs text-slate-400">Email API v1.0.0</p>
          </div>

          {/* Endpoints List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {endpoints.map((endpoint, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEndpoint(endpoint)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedEndpoint?.path === endpoint.path &&
                    selectedEndpoint?.method === endpoint.method
                      ? "bg-slate-700 border border-purple-500/50 shadow-lg"
                      : "hover:bg-slate-800 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 text-xs font-bold text-white rounded bg-gradient-to-r ${getMethodColor(
                        endpoint.method,
                      )}`}
                    >
                      {endpoint.method}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono break-words">
                    {endpoint.path}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {endpoint.summary}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700 text-xs text-slate-500">
            <p>📚 {endpoints.length} endpoints</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedEndpoint ? (
            <>
              {/* Header */}
              <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`px-4 py-2 text-lg font-bold text-white rounded-lg bg-gradient-to-r ${getMethodColor(
                      selectedEndpoint.method,
                    )}`}
                  >
                    {selectedEndpoint.method}
                  </span>
                  <code className="font-mono text-2xl text-slate-300">
                    {selectedEndpoint.path}
                  </code>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedEndpoint.summary}
                </h2>
                <p className="text-slate-400">{selectedEndpoint.description}</p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-8 p-8">
                  {/* Left: Details */}
                  <div className="space-y-6">
                    {/* Description */}
                    {selectedEndpoint.description && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">
                          📝 Description
                        </h3>
                        <p className="text-slate-300 bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                          {selectedEndpoint.description}
                        </p>
                      </div>
                    )}

                    {/* Authentication */}
                    {selectedEndpoint.security &&
                      selectedEndpoint.security.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">
                            🔐 Authentication
                          </h3>
                          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                            <p className="text-blue-300 text-sm">
                              This endpoint requires API key authentication
                            </p>
                            <code className="block mt-2 text-xs text-blue-400">
                              Authorization: Bearer YOUR_API_KEY
                            </code>
                          </div>
                        </div>
                      )}

                    {/* Parameters */}
                    {selectedEndpoint.parameters &&
                      selectedEndpoint.parameters.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-white mb-3">
                            📋 Parameters
                          </h3>
                          <div className="space-y-3">
                            {selectedEndpoint.parameters.map((param, idx) => (
                              <div
                                key={idx}
                                className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <code className="text-sm font-mono text-purple-300">
                                    {param.name}
                                  </code>
                                  <span
                                    className={`text-xs px-2 py-1 rounded ${
                                      param.required
                                        ? "bg-red-900/30 text-red-300"
                                        : "bg-slate-700/50 text-slate-400"
                                    }`}
                                  >
                                    {param.required ? "required" : "optional"}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mb-2">
                                  {param.description}
                                </p>
                                <p className="text-xs text-slate-500">
                                  Type:{" "}
                                  <code className="text-slate-400">
                                    {param.in}
                                  </code>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Request Body */}
                    {selectedEndpoint.requestBody && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">
                          📤 Request Body
                        </h3>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 font-mono text-sm">
                          {selectedEndpoint.requestBody.content &&
                            selectedEndpoint.requestBody.content[
                              "application/json"
                            ] && (
                              <pre className="text-slate-300 overflow-auto">
                                {JSON.stringify(
                                  selectedEndpoint.requestBody.content[
                                    "application/json"
                                  ].schema || {},
                                  null,
                                  2,
                                )}
                              </pre>
                            )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Response & Examples */}
                  <div className="space-y-6">
                    {/* Responses */}
                    {selectedEndpoint.responses && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-3">
                          ✅ Responses
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(selectedEndpoint.responses).map(
                            ([statusCode, response]: [string, any]) => {
                              const isSuccess = statusCode.startsWith("2");
                              return (
                                <div
                                  key={statusCode}
                                  className={`border rounded-lg p-4 ${
                                    isSuccess
                                      ? "bg-green-900/20 border-green-700/50"
                                      : "bg-red-900/20 border-red-700/50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <span
                                      className={`text-sm font-bold ${
                                        isSuccess
                                          ? "text-green-300"
                                          : "text-red-300"
                                      }`}
                                    >
                                      {statusCode}
                                    </span>
                                    <p
                                      className={`text-xs ${isSuccess ? "text-green-300" : "text-red-300"}`}
                                    >
                                      {response.description}
                                    </p>
                                  </div>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </div>
                    )}

                    {/* Usage Example */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">
                        💻 Example
                      </h3>
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-auto max-h-64">
                        {selectedEndpoint.method === "POST" ? (
                          <pre>{`curl -X POST ${origin}/api${selectedEndpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(
    {
      sender: "user@example.com",
      subject: "Hello",
      body: "Test email",
    },
    null,
    2,
  )}'`}</pre>
                        ) : (
                          <pre>{`curl -X GET ${origin}/api${selectedEndpoint.path}?limit=10 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</pre>
                        )}
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <p className="text-xs text-slate-400">
                        💡{" "}
                        <span className="text-slate-300">
                          Pro tip: Use the examples to test your integration
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-2xl mb-2">📡</p>
                <p className="text-slate-400">
                  Select an endpoint to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
