import SetAvailability from '@/components/availability/set-availability';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Availability',
  description:
    'Set your business hours and availability for client bookings. Manage your schedule, time zones, and booking slots.',
};

const AvailabilityPage = () => {
  return <SetAvailability />;
};

export default AvailabilityPage;
