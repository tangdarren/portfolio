import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';

export default function ContactPage() {
  return (
    <div className="container-page py-6 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)] lg:items-start lg:gap-10">
        <section aria-labelledby="get-in-touch-title" className="min-w-0">
          <h1 id="get-in-touch-title" className="section-title">
            Get in Touch
          </h1>
          <div className="mt-2 space-y-2 text-sm text-mist-300 sm:text-base">
            <p>
              I&apos;m always open to discussing software engineering
              opportunities, full-stack projects, AI-powered products, and
              practical automation systems.
            </p>
            <p>
              Send me a message and I&apos;ll get back to you as soon as
              possible.
            </p>
          </div>

          <div className="mt-5">
            <ContactForm />
          </div>
        </section>

        <aside className="min-w-0 lg:pt-1">
          <section aria-labelledby="connect-online-title">
            <h2 id="connect-online-title" className="section-title">
              Connect Online
            </h2>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
