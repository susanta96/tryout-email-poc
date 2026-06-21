/**
 * Migration: Add html_body column to incoming_emails table
 * 
 * Run this script to add HTML support to your Neon DB:
 * npx tsx migrations/001_add_html_body.ts
 */

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  try {
    console.log("🔄 Starting migration: Adding html_body column...");

    // Add html_body column
    await sql`
      ALTER TABLE incoming_emails
      ADD COLUMN IF NOT EXISTS html_body TEXT;
    `;

    console.log("✅ Added html_body column to incoming_emails table");

    // Verify the column exists
    const result = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'incoming_emails'
      ORDER BY ordinal_position;
    `;

    console.log("\n📋 Current table structure:");
    console.table(result);

    console.log("\n✨ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();
