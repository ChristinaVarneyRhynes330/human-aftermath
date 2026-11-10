import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function reply(message: string, status = 200, ok = status === 200) {
  return NextResponse.json({ ok, message }, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

export async function POST(request: NextRequest) {
  if (process.env.WAITLIST_ENABLED !== 'true') {
    return reply('Early access is not accepting signups yet. Please try again later.', 503);
  }
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) return reply('Invalid request origin.', 403);
    } catch { return reply('Invalid request origin.', 403); }
  }
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return reply('Expected a JSON submission.', 415);
  }
  const length = Number(request.headers.get('content-length') || '0');
  if (length > 2048) return reply('Submission is too large.', 413);

  let data: Record<string, unknown>;
  try {
    data = await request.json();
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid');
  } catch {
    return reply('Please use the signup form to join.', 400);
  }

  // Honeypot: respond without writing so automated spam receives no signal.
  if (typeof data.website === 'string' && data.website.trim()) {
    return reply('Your request has been received.');
  }
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!emailPattern.test(email) || email.length > 254 || email.length < 5) {
    return reply('Please enter a valid email address.', 400);
  }
  if (data.consent !== true) {
    return reply('Please confirm that you want to receive course updates.', 400);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Launch waitlist configuration missing.');
    return reply('Signup is temporarily unavailable. Please try again later.', 503);
  }

  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await db.from('launch_waitlist').insert({
    email,
    source: 'phase1-landing',
    marketing_consent_at: new Date().toISOString(),
    privacy_version: '2026-11-10',
  });

  if (error && error.code !== '23505') {
    console.error('Launch waitlist insert failed:', error.code);
    return reply('Signup is temporarily unavailable. Please try again later.', 503);
  }
  return reply("You're on the early-access list. We will share course updates as they become available.");
}
