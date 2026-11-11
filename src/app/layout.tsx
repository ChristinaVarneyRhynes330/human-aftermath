import type { Metadata, Viewport } from 'next';
import GlobalHeader from '@/components/GlobalHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Humanity Studies: The Wound Concealed | Trauma Literacy. Transforming Humanity.',
  description: 'An interdisciplinary course about concealed psychological pain, the science of trauma, and the journey from trauma literacy to human literacy.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[#080C10] text-[#E2E8F0] antialiased selection:bg-[#617B8A]/30 selection:text-[#172126] flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-xl focus:bg-[#16202A] focus:p-3 focus:text-[#EDAE9D] focus:border focus:border-[#EDAE9D]"
        >
          Skip to main content
        </a>

        <GlobalHeader />

        <div id="main-content" className="flex-1 w-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
