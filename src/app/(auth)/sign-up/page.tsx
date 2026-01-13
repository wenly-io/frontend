import type { Metadata } from 'next';
import Image from 'next/image';

import SignUpForm from '@/components/auth/sign-up/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up | Wenly',
  description:
    'Create your Wenly account and start managing bookings through WhatsApp. Sign up in minutes to get started.',
};

const SignUpPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F6F6] px-7 pt-28 pb-20">
      {/* Card container with decorations */}
      <div className="relative w-140.75">
        {/* Decorative SVGs */}
        <Image
          src="/svgs/decorative/purple-curve-top-left.svg"
          alt=""
          width={107}
          height={107}
          className="pointer-events-none absolute -top-14 left-0"
        />
        <Image
          src="/svgs/decorative/yellow-arc-top-right.svg"
          alt=""
          width={219}
          height={178}
          className="pointer-events-none absolute -top-24 -right-2 md:-right-14"
        />
        <Image
          src="/svgs/decorative/yellow-half-circle-center-left.svg"
          alt=""
          width={260}
          height={222}
          className="pointer-events-none absolute top-1/3 -left-48 hidden lg:block"
        />
        <Image
          src="/svgs/decorative/purple-ball-center-right.svg"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none absolute top-1/3 -right-28 hidden md:block"
        />
        <Image
          src="/svgs/decorative/red-curve-bottom-right.svg"
          alt=""
          width={88}
          height={88}
          className="pointer-events-none absolute right-2 -bottom-14 md:-right-16 md:bottom-14"
        />

        {/* Main card (on top) */}
        <div className="relative z-10 space-y-8 rounded-[24px] bg-white px-6 py-9 sm:space-y-11 sm:p-12">
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
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
