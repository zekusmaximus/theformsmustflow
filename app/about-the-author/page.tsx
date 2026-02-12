import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: {
    absolute: 'About the Author — Jeffrey A. Zyjeski | The Forms Must Flow',
  },
  description:
    'Learn about Jeffrey A. Zyjeski, a writer of satirical sci-fi and humorous space opera, and the creator of The Forms Must Flow.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/about-the-author/`,
  },
};

export default function AboutTheAuthorPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <section className="flex-1 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            About Jeffrey A. Zyjeski
          </h1>
          <div className="space-y-4 text-lg leading-relaxed text-primary-700">
            <p>
              Jeffrey A. Zyjeski writes satirical science fiction and humorous space opera about
              systems, power, and the people who keep everything from falling apart.
            </p>
            <p>
              His storytelling blends high-concept absurdity with grounded characters and sharp
              social observation, balancing comedic momentum with real stakes.
            </p>
            <p>
              <em>The Forms Must Flow</em> is his latest novel and a sharp example of that voice.
            </p>
            <p>
              Author site:{' '}
              <a
                href="https://www.zyjeski.com/"
                className="text-accent-700 hover:text-accent-800 underline"
              >
                https://www.zyjeski.com/
              </a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

