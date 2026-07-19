import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_TO_EMAIL, TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { z } from 'zod';
import { contactSchema } from '@/lib/validation/contact';
import { rateLimit } from '@/lib/rate-limit';

export const prerender = false;

async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  // Turnstile is enforced only when a secret is configured for this deploy.
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip ?? undefined,
    }),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? 'unknown';
  const { allowed, retryAfterSeconds } = rateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 60_000,
  });
  if (!allowed) {
    return Response.json(
      { ok: false, error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'Validation failed', issues: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, phone, message, turnstileToken } = parsed.data;

  const human = await verifyTurnstile(turnstileToken, clientAddress ?? null);
  if (!human) {
    return Response.json(
      { ok: false, error: 'Verification failed. Please try again.' },
      { status: 403 },
    );
  }

  if (!RESEND_API_KEY) {
    // No mail provider configured (e.g. local dev): accept without persisting.
    // Never log submitted personal data (name/email/phone/message).
    console.info('[contact] RESEND_API_KEY not set — submission accepted but not delivered');
    return Response.json({ ok: true });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'REDI Sites <noreply@redisites.com>',
      to: [CONTACT_TO_EMAIL ?? 'info@redisites.com'],
      replyTo: email,
      subject: `Contact form: ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : null, '', message]
        .filter((line): line is string => line !== null)
        .join('\n'),
    });
    if (error) throw error;
  } catch (err) {
    console.error('[contact] failed to send email', err);
    return Response.json(
      { ok: false, error: 'Failed to send your message. Please try again later.' },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
};
