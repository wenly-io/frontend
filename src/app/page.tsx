'use client';

import { UserButton, useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (isSignedIn && user) {
    return (
      <main className="min-h-screen bg-white">
        {/* Header with logo and logout */}
        <header className="flex items-center justify-between border-b border-black px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
              <span className="text-lg font-bold text-white">W</span>
            </div>
            <span className="text-2xl font-bold text-black">Wenly</span>
          </div>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
            }}
          />
        </header>

        {/* Main content */}
        <div className="flex items-center justify-center px-6 py-20">
          <div className="w-full max-w-md">
            {/* Welcome card */}
            <div className="rounded-2xl border-2 border-black bg-white p-8">
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold text-black">
                  Welcome back, {user.firstName}!
                </h1>
                <p className="text-gray-700">
                  You&apos;re all set and ready to manage your bookings
                </p>
              </div>

              {/* User info */}
              <div className="mb-8 space-y-4 rounded-lg border-2 border-black bg-gray-50 p-6">
                <div>
                  <p className="text-sm font-medium text-black">Full Name</p>
                  <p className="mt-1 text-lg font-semibold text-black">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">Email</p>
                  <p className="mt-1 text-lg font-semibold break-all text-black">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="space-y-3">
                <Link href="/" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-black font-semibold text-white hover:bg-gray-900"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Footer note */}
            <p className="mt-6 text-center text-sm text-gray-700">
              Need help? Check out our documentation or contact support.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header with logo */}
      <header className="flex items-center justify-between border-b border-black px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
            <span className="text-lg font-bold text-white">W</span>
          </div>
          <span className="text-2xl font-bold text-black">Wenly</span>
        </div>
      </header>

      {/* Hero section */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* Welcome card */}
          <div className="rounded-2xl border-2 border-black bg-white p-8">
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-4xl font-bold text-black">
                Welcome to Wenly
              </h1>
              <p className="text-lg text-gray-700">
                Your friendly WhatsApp booking assistant
              </p>
            </div>

            {/* Description */}
            <div className="mb-8 space-y-3 text-center text-gray-700">
              <p>
                Manage and organize your bookings effortlessly through WhatsApp.
              </p>
              <p className="text-sm">
                Get started by signing in or creating an account.
              </p>
            </div>

            {/* Auth buttons */}
            <div className="space-y-3">
              <Link href="/sign-in" className="block">
                <Button
                  size="lg"
                  className="w-full bg-black font-semibold text-white hover:bg-gray-900"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </Link>

              <Link href="/sign-up" className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-black font-semibold text-black hover:bg-gray-100"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Footer note */}
            <p className="mt-6 text-center text-xs text-gray-600">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>

          {/* Features hint */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg border border-black bg-white p-4">
              <div className="mb-2 text-2xl">📅</div>
              <p className="text-xs font-medium text-black">Easy Booking</p>
            </div>
            <div className="rounded-lg border border-black bg-white p-4">
              <div className="mb-2 text-2xl">💬</div>
              <p className="text-xs font-medium text-black">WhatsApp Ready</p>
            </div>
            <div className="rounded-lg border border-black bg-white p-4">
              <div className="mb-2 text-2xl">⚡</div>
              <p className="text-xs font-medium text-black">Instant Setup</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
