import type { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Create your Wenly account and start managing bookings through WhatsApp. Sign up in minutes to get started.',
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignUp />
    </main>
  );
}
