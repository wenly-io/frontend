import Image from 'next/image';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6F6F6] px-7 pt-26 pb-20">
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
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
