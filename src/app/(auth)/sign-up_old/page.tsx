import type { Metadata } from 'next';
import Image from 'next/image';

import SignUpForm from '@/components/auth/sign-up/sign-up-form';
import AuthLayout from '@/components/auth/auth-layout';

export const metadata: Metadata = {
  title: 'Sign Up | Wenly',
  description:
    'Create your Wenly account and start managing bookings through WhatsApp. Sign up in minutes to get started.',
};

const SignUpPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6">
        <Image
          src="./svgs/wenly-logo.svg"
          alt="Wenly Logo"
          width={60}
          height={60}
        />

        <div className="flex flex-col items-center">
          <h1 className="mb-1 text-center text-2xl font-semibold sm:mb-0.5 sm:text-3xl">
            Create Wenly Account
          </h1>
          <p className="text-muted-foreground max-w-77.25 text-center text-sm">
            Fill in your information or authenticate using provided channels
          </p>
        </div>
      </div>

      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
