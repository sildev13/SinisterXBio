import { NextRequest, NextResponse } from "next/server";

import { createRateLimit, getClientIP } from "@/utils/rateLimit";

// Max 3 delivered messages per IP per 10 minutes
const limiter = createRateLimit(3, 10 * 60 * 1000);

const LIMITS = {
  name: 80,
  email: 120,
  subject: 120,
  message: 2000,
};

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  // Strip Discord markdown/mention characters so submitted text can't ping or format
  return value
    .trim()
    .slice(0, maxLength)
    .replace(/@(everyone|here)/gi, "@​$1");
}

export async function POST(request: NextRequest) {
  const webhookURL = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookURL) {
    console.error("DISCORD_WEBHOOK_URL environment variable is not set");
    return NextResponse.json({ message: "Contact form is not configured" }, { status: 500 });
  }

  const ip = getClientIP(request);

  if (limiter.isLimited(ip)) {
    return NextResponse.json(
      { message: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans never see it
  if (clean(body.website, 100)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);

  if (!name || !message) {
    return NextResponse.json({ message: "Name and message are required" }, { status: 400 });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Portfolio Contact",
        embeds: [
          {
            title: subject || "New contact message",
            description: message,
            color: 0x0066ff,
            fields: [
              { name: "Name", value: name, inline: true },
              { name: "Email", value: email || "Not provided", inline: true },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Discord webhook failed", response.status, await response.text());
      return NextResponse.json({ message: "Could not deliver your message" }, { status: 502 });
    }

    limiter.record(ip);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Discord webhook error", error);
    return NextResponse.json({ message: "Could not deliver your message" }, { status: 502 });
  }
}
