import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react';
import { contactSchema, type ContactFormValues } from '@/lib/validation/contact';

interface Props {
  turnstileSiteKey?: string;
  copy: {
    heading: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    messageLabel: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
  };
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full rounded-lg border border-slate-400/50 bg-white px-4 py-3 text-base text-ink-800 shadow-soft transition-colors duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-[3px] focus:ring-cyan-400/30 aria-[invalid=true]:border-red-500';

export default function ContactForm({ turnstileSiteKey, copy }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileToken = useRef<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;

    const render = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: turnstileSiteKey,
          callback: (token: string) => {
            turnstileToken.current = token;
          },
        });
      }
    };

    if (window.turnstile) {
      render();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = render;
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('submitting');
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, turnstileToken: turnstileToken.current }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? copy.errorMessage);
      }
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : copy.errorMessage);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex min-h-[380px] flex-col items-center justify-center gap-4 text-center"
        role="status"
      >
        <CheckCircle2 size={56} className="text-cyan-500" aria-hidden="true" />
        <p className="text-ink-600 max-w-md text-lg">{copy.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="font-heading text-sm font-semibold tracking-wide text-cyan-500 uppercase underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-2xl">
      <h2 className="font-heading text-navy-950 text-2xl font-bold tracking-tight uppercase">
        {copy.heading}
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="font-heading text-navy-950 mb-2 block text-sm font-semibold tracking-wide uppercase"
          >
            {copy.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={inputClasses}
            {...register('name')}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="font-heading text-navy-950 mb-2 block text-sm font-semibold tracking-wide uppercase"
          >
            {copy.emailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClasses}
            {...register('email')}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="contact-phone"
          className="font-heading text-navy-950 mb-2 block text-sm font-semibold tracking-wide uppercase"
        >
          {copy.phoneLabel}
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          className={inputClasses}
          {...register('phone')}
        />
        {errors.phone && (
          <p id="contact-phone-error" className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="mt-6">
        <label
          htmlFor="contact-message"
          className="font-heading text-navy-950 mb-2 block text-sm font-semibold tracking-wide uppercase"
        >
          {copy.messageLabel}
        </label>
        <textarea
          id="contact-message"
          rows={6}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${inputClasses} resize-y`}
          {...register('message')}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {turnstileSiteKey && <div ref={turnstileRef} className="mt-6" />}

      <AnimatePresence>
        {status === 'error' && serverError && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            <CircleAlert size={18} className="shrink-0" aria-hidden="true" />
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="font-heading text-navy-950 shadow-soft hover:shadow-card mt-8 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-md bg-cyan-400 px-6 text-sm font-semibold tracking-wide uppercase transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-cyan-300 focus-visible:ring-[3px] focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' && (
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
        )}
        {status === 'submitting' ? 'Sending…' : copy.submitLabel}
      </button>
    </form>
  );
}
