'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const SyncGoogleCalendarButton = () => {
  const router = useRouter();
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const logToken = async () => {
      if (!isSignedIn) return;

      const token = await getToken({ template: 'backend' });
      console.log("USER'S TOKEN:", token);
    };

    logToken();
  }, [getToken, isSignedIn]);

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() => router.push('/bookings')}
    >
      Allow Synchronization
    </Button>
  );
};

export default SyncGoogleCalendarButton;
