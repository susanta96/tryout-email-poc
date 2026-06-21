import { NextResponse } from "next/server";

export async function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "Email API",
      description: "A powerful API for managing incoming emails",
      version: "1.0.0",
    },
    servers: [
      {
        url: "/api",
        description: "Production server",
      },
    ],
    paths: {
      "/emails": {
        post: {
          tags: ["Emails"],
          summary: "Create a new email record",
          operationId: "createEmail",
          security: [{ ApiKeyAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["sender", "subject", "body"],
                  properties: {
                    message_id: {
                      type: "string",
                      description: "Unique identifier for deduplication",
                    },
                    sender: {
                      type: "string",
                      format: "email",
                      description: "Sender email address",
                    },
                    subject: { type: "string", description: "Email subject" },
                    body: { type: "string", description: "Email content" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Email created successfully" },
            400: { description: "Missing required fields" },
            401: { description: "Unauthorized" },
          },
        },
        get: {
          tags: ["Emails"],
          summary: "Retrieve emails",
          operationId: "listEmails",
          security: [{ ApiKeyAuth: [] }],
          parameters: [
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", default: 50, maximum: 100 },
            },
            {
              name: "offset",
              in: "query",
              schema: { type: "integer", default: 0 },
            },
          ],
          responses: {
            200: { description: "Emails retrieved successfully" },
            401: { description: "Unauthorized" },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
  };

  return NextResponse.json(spec);
}
