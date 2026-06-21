import { sql } from "@/lib/db";
import EmailCard from "@/components/EmailCard";

export const revalidate = 30;

type Email = {
  id: number;
  message_id: string | null;
  sender: string;
  subject: string;
  body: string;
  received_at: string;
};

async function getEmails(): Promise<Email[]> {
  const rows = await sql`
    SELECT id, message_id, sender, subject, body, received_at
    FROM incoming_emails
    ORDER BY received_at DESC
    LIMIT 50
  `;
  return rows as Email[];
}

export default async function Home() {
  const emails = await getEmails();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Emails received via Power Automate
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
            {emails.length} messages
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
        {emails.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg font-medium">No emails yet</p>
            <p className="text-sm mt-1">
              Trigger the Power Automate flow to see emails here.
            </p>
          </div>
        ) : (
          emails.map((email) => <EmailCard key={email.id} email={email} />)
        )}
      </div>
    </main>
  );
}
