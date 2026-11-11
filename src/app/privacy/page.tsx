import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Early-Access List | Humanity Studies: The Wound Concealed',
  description: 'How Humanity Studies: The Wound Concealed handles early-access email list information.',
};

export default function PrivacyPage() {
  const email = process.env.PUBLIC_CONTACT_EMAIL;
  return (
    <main className="w-full bg-[#F2EEE7] text-[#253E56] min-h-[85vh] px-6 py-16 sm:py-24">
      <article className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#3E6892] text-xs font-semibold uppercase tracking-[0.15em] hover:underline">← Back to Humanity Studies: The Wound Concealed</Link>
        <p className="mt-12 text-xs uppercase font-bold tracking-[0.22em] text-[#617B8A]">Phase 1 · November 10, 2026</p>
        <h1 className="font-serif-editorial text-6xl sm:text-7xl mt-4">Privacy & your <span className="italic">choice.</span></h1>
        <p className="text-base leading-8 mt-7 text-[#3E5958]">This notice describes the information collected through the early-access form. We aim to keep the initial invitation simple, consent-based, and respectful of your privacy.</p>
        <div className="mt-12 space-y-10 text-[#354E4D] leading-8">
          <section><h2 className="font-serif-editorial text-3xl text-[#253E56] mb-3">What we collect</h2><p>When you voluntarily join the early-access list, we collect your email address, your recorded consent, signup date, and the signup source. We do not ask for trauma histories, diagnoses, health records or personal stories.</p></section>
          <section><h2 className="font-serif-editorial text-3xl text-[#253E56] mb-3">Why we collect it</h2><p>We use this information only to communicate about Humanity Studies: The Wound Concealed development, free educational resources, preview invitations, and future launch opportunities that you opted into. Enrollment, purchases, and learner progress are not part of the Phase 1 waitlist.</p></section>
          <section><h2 className="font-serif-editorial text-3xl text-[#253E56] mb-3">Where it is stored</h2><p>Waitlist records are stored in a restricted Supabase database. We use service providers to host our site and process communication. We do not intend to sell your email list. If an email delivery provider is added, it will receive the information necessary to deliver requested messages.</p></section>
          <section><h2 className="font-serif-editorial text-3xl text-[#253E56] mb-3">Unsubscribing and deletion</h2><p>You may withdraw your consent and request removal of your email. Future marketing emails will include an unsubscribe method. We retain signup information only as needed to operate the invitation list and honor opt-out or lawful retention obligations.</p></section>
          <section><h2 className="font-serif-editorial text-3xl text-[#253E56] mb-3">Questions or privacy requests</h2>
            {email
              ? <p>Write to <a href={'mailto:' + email} className="text-[#2B6179] underline underline-offset-4">{email}</a> to ask about your data, update your contact information or request deletion.</p>
              : <p className="rounded-lg border border-[#BF998B] p-4 bg-[#F7E9E3]">A public contact address must be configured before the waitlist is opened to visitors. Email collection should remain disabled until this is published.</p>}
          </section>
        </div>
        <div className="mt-16 pt-8 border-t border-[#B9C9C3] text-sm text-[#607873]">This is a Phase 1 launch notice. It should be reviewed alongside final hosting, mailing service, cookie practices and applicable privacy requirements before public release.</div>
      </article>
    </main>
  );
}
