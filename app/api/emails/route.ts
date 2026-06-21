import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { validateApiKey } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { message_id, sender, subject, body: emailBody, html_body: htmlBody } = body;

  if (!sender || !subject || !emailBody) {
    return NextResponse.json(
      { error: "sender, subject, and body are required" },
      { status: 400 }
    );
  }

  const rows = await sql`
    INSERT INTO incoming_emails (message_id, sender, subject, body, html_body)
    VALUES (${message_id ?? null}, ${sender}, ${subject}, ${emailBody}, ${htmlBody ?? null})
    ON CONFLICT (message_id) DO NOTHING
    RETURNING id, message_id, sender, subject, body, html_body, received_at
  `;

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "Duplicate email, skipped" },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true, email: rows[0] }, { status: 201 });
}

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);
  const offset = parseInt(searchParams.get("offset") ?? "0");

  const rows = await sql`
    SELECT id, message_id, sender, subject, body, html_body, received_at
    FROM incoming_emails
    ORDER BY received_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return NextResponse.json({ emails: rows });
}
