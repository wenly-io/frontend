import type { Metadata } from 'next';
import BookingsPage from '@/components/bookings/bookings-page';

export const metadata: Metadata = {
  title: 'Your Schedule',
  description:
    'View and manage all your appointments and bookings in one place.',
};

const BookingsRoute = () => {
  return <BookingsPage />;
};

export default BookingsRoute;
