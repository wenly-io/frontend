import type { Metadata } from 'next';
import { inter } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: { template: '%s | Wenly', default: 'Home | Wenly' },
  description:
    'Your friendly WhatsApp booking assistant! Wenly helps you manage and organize bookings effortlessly through WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
