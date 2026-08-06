'use client';

import PageHeader from '@/components/layout/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';
import ResumePanel from '@/components/contact/ResumePanel';

export default function ContactPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <PageHeader
        eyebrow="Contact"
        title="Contact"
        description="A straightforward place to connect about roles, projects, and collaborations."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section aria-labelledby="get-in-touch-title" className="flex flex-col gap-5">
          <div>
            <p className="eyebrow">Message</p>
            <h2 id="get-in-touch-title" className="mt-2 section-title">
              Get in Touch
            </h2>
            <div className="mt-2 space-y-2 text-sm text-mist-300 sm:text-base">
              <p>
                I'm always open to discussing software engineering
                opportunities, full-stack projects, AI-powered products, and
                practical automation systems.
              </p>
              <p>Send me a message and I'll get back to you as soon as possible.</p>
            </div>
          </div>

          <ContactForm />
        </section>

        <aside className="flex flex-col gap-6">
          <ResumePanel />

          <section aria-labelledby="find-me-online-title">
            <div>
              <p className="eyebrow">Elsewhere</p>
              <h2
                id="find-me-online-title"
                className="mt-2 section-title"
              >
                Find Me Online
              </h2>
            </div>
            <div className="mt-4">
              <SocialLinks />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
