"use client";

import { useState } from "react";

type Email = {
  id: number;
  message_id: string | null;
  sender: string;
  subject: string;
  body: string;
  received_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getInitials(sender: string) {
  const match = sender.match(/^([^<@\s]+)/);
  const word = match?.[1] ?? sender;
  return word.slice(0, 2).toUpperCase();
}

function avatarColor(sender: string) {
  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-indigo-500",
  ];
  const idx =
    sender.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    colors.length;
  return colors[idx];
}

export default function EmailCard({ email }: { email: Email }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setExpanded((e) => !e)}
    >
      <div className="flex items-start gap-4 p-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full ${avatarColor(email.sender)} flex items-center justify-center text-white text-sm font-semibold`}
        >
          {getInitials(email.sender)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {email.sender}
            </p>
            <time className="flex-shrink-0 text-xs text-gray-400">
              {formatDate(email.received_at)}
            </time>
          </div>
          <p className="text-sm font-medium text-gray-800 mt-0.5 truncate">
            {email.subject}
          </p>
          {!expanded && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {email.body}
            </p>
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-4 py-4">
          <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {email.body}
          </div>
          {email.message_id && (
            <p className="mt-3 text-xs text-gray-400 font-mono">
              ID: {email.message_id}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
