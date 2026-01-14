import type { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Login to your Wenly account and start managing bookings through WhatsApp.',
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn />
    </main>
  );
}
