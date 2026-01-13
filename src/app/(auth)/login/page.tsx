import type { Metadata } from 'next';
import Image from 'next/image';

import LoginForm from '@/components/auth/login/login-form';
import AuthLayout from '@/components/auth/auth-layout';

export const metadata: Metadata = {
  title: 'Login | Wenly',
  description:
    'Login to your Wenly account and start managing bookings through WhatsApp.',
};

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/svgs/wenly-logo.svg"
          alt="Wenly Logo"
          width={60}
          height={60}
        />

        <div className="flex flex-col items-center">
          <h1 className="mb-1 text-center text-2xl font-semibold sm:mb-0.5 sm:text-3xl">
            Login to Wenly
          </h1>
          <p className="text-muted-foreground max-w-77.25 text-center text-sm">
            Welcome back, login to continue
          </p>
        </div>
      </div>

      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
