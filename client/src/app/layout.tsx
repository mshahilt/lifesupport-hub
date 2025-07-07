import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ApiProvider from '@/components/providers/ApiProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Life Support Learning',
  description: 'Medical education and live learning platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ApiProvider />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
