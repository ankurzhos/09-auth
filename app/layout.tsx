import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import './globals.css';
import 'modern-normalize';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Notes management web application',
  openGraph: {
    title: 'NoteHub',
    description: 'Notes management web application',
    url: 'https://notehub.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children} {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
