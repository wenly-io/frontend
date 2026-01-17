import type { Metadata } from 'next';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { SyncArrowIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Sync Google Calendar',
  description:
    'Connect your Google Calendar to Wenly and manage all your bookings effortlessly via WhatsApp.',
};

const ConnectGoogleCalendarPage = () => {
  return (
    <>
      <nav className="flex justify-between px-4 pt-4 sm:px-12">
        <div className="flex items-center gap-2">
          <Image
            src="./svgs/wenly-logo.svg"
            alt="Wenly Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-semibold">Wenly</span>
        </div>

        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-10 w-10',
            },
          }}
        />
      </nav>

      <main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-5">
        <div className="relative">
          {/* Decorative SVGs */}
          <Image
            src="/svgs/decorative/purple-curve-top-left.svg"
            alt=""
            width={61}
            height={61}
            className="pointer-events-none absolute -top-10 -left-2"
          />
          <Image
            src="/svgs/decorative/yellow-arc-top-right.svg"
            alt=""
            width={125}
            height={102}
            className="pointer-events-none absolute -top-14 right-0 sm:-right-10"
          />
          <Image
            src="/svgs/decorative/yellow-half-circle-center-left-small.svg"
            alt=""
            width={118}
            height={93}
            className="pointer-events-none absolute -bottom-7 -left-20 hidden sm:block"
          />
          <Image
            src="/svgs/decorative/purple-ball-center-right.svg"
            alt=""
            width={170}
            height={170}
            className="pointer-events-none absolute -right-28 -bottom-16 hidden md:block"
          />

          {/* Main Content */}
          <div className="relative mx-auto flex max-w-127 flex-col items-center space-y-11 rounded-[24px] bg-white px-7 py-11 sm:space-y-13.5 sm:p-17.5">
            <div>
              <h1 className="mb-1 text-center text-3xl font-semibold">
                Welcome to Wenly!
              </h1>
              <p className="text-muted-foreground text-center font-medium">
                Synchronize your Google Calendar for the best experience, click
                allow to begin.
              </p>
            </div>

            <div className="flex items-center gap-7">
              <Image
                src="./svgs/google-calendar-logo.svg"
                alt="Google Calendar Logo"
                width={90}
                height={90}
                className="size-15 sm:size-auto"
              />
              <SyncArrowIcon />
              <Image
                src="./svgs/wenly-logo.svg"
                alt="Wenly Logo"
                width={90}
                height={90}
                className="size-15 sm:size-auto"
              />
            </div>

            <Button size="lg" className="w-full">
              Allow Synchronization
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ConnectGoogleCalendarPage;
