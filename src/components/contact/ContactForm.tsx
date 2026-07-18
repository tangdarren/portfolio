import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Honeypot — must remain empty for a genuine submission.
  website: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initial: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Frontend contact form. Wire up a real provider by setting VITE_CONTACT_ENDPOINT
 * in .env.local. See .env.example. When the env var is missing, the form simulates
 * a submission so the UI can still be reviewed.
 */
export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

  const setField = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = (v: FormState): FieldErrors => {
    const e: FieldErrors = {};
    if (!v.name.trim()) e.name = 'Please enter your name.';
    if (!v.email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(v.email.trim()))
      e.email = 'That email address does not look valid.';
    if (!v.subject.trim()) e.subject = 'Please add a subject.';
    if (!v.message.trim()) e.message = 'Please add a message.';
    else if (v.message.trim().length < 10)
      e.message = 'Message should be at least 10 characters.';
    return e;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (values.website.trim() !== '') {
      // Silent success for honeypot hits.
      setStatus('success');
      setValues(initial);
      return;
    }

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('error');
      setErrorMessage('Please fix the highlighted fields and try again.');
      return;
    }

    setStatus('submitting');

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
          }),
        });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      } else {
        // Simulated round-trip while no provider is configured.
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus('success');
      setValues(initial);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong sending your message.',
      );
    }
  };

  const submitting = status === 'submitting';

  return (
    <form onSubmit={onSubmit} noValidate className="panel p-6 sm:p-7">
      {/* Honeypot */}
      <label className="sr-only" aria-hidden htmlFor="website-hp">
        Website
      </label>
      <input
        id="website-hp"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={values.website}
        onChange={setField('website')}
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Your Name"
          id="name"
          value={values.name}
          onChange={setField('name')}
          autoComplete="name"
          required
          error={errors.name}
        />
        <Field
          label="Your Email"
          id="email"
          type="email"
          value={values.email}
          onChange={setField('email')}
          autoComplete="email"
          required
          error={errors.email}
        />
        <div className="sm:col-span-2">
          <Field
            label="Subject"
            id="subject"
            value={values.subject}
            onChange={setField('subject')}
            required
            error={errors.subject}
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Your Message"
            id="message"
            as="textarea"
            rows={6}
            value={values.message}
            onChange={setField('message')}
            required
            error={errors.message}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p
          className="max-w-md font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400"
          aria-live="polite"
        >
          {status === 'success' && (
            <span className="inline-flex items-center gap-2 text-accent-green">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Message sent — I'll get back to you soon.
            </span>
          )}
          {status === 'error' && errorMessage && (
            <span className="inline-flex items-center gap-2 text-rose-300">
              <AlertCircle className="h-3.5 w-3.5" />
              {errorMessage}
            </span>
          )}
          {status !== 'success' && status !== 'error' && (
            <span>
              {endpoint
                ? 'Send · powered by your configured provider'
                : 'Send · demo mode (no endpoint configured)'}
            </span>
          )}
        </p>

        <button
          type="submit"
          className="btn-primary"
          disabled={submitting}
          aria-disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  as?: 'input' | 'textarea';
  rows?: number;
  error?: string;
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
  as = 'input',
  rows,
  error,
}: FieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const inputClass = [
    'w-full rounded-md border bg-ink-950/60 px-3 py-2.5 text-sm text-mist-100 placeholder:text-mist-500 transition-colors focus:outline-none',
    error
      ? 'border-rose-400/40 focus:border-rose-400/70'
      : 'border-white/10 focus:border-accent-cyan/50',
  ].join(' ');

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-300"
      >
        {label}
        {required && <span className="ml-1 text-accent-cyan">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={rows ?? 5}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={inputClass}
        />
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="font-mono text-[11px] text-rose-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}
