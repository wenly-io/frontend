'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const SyncGoogleCalendarButton = () => {
  const router = useRouter();

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
