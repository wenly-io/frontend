'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarView } from './calendar-view';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

const BookingsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Sample events - replace with actual Google Calendar events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Social Presentation',
      start: new Date(2026, 0, 20, 1, 0),
      end: new Date(2026, 0, 20, 2, 30),
      color: '#36D8AF',
    },
    {
      id: '2',
      title: 'Big Event',
      start: new Date(2026, 0, 20, 1, 30),
      end: new Date(2026, 0, 20, 3, 0),
      color: '#36A2D8',
    },
    {
      id: '3',
      title: 'Bug Fixes',
      start: new Date(2026, 0, 20, 6, 0),
      end: new Date(2026, 0, 20, 6, 30),
      color: '#D86136',
    },
  ];

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <section className="min-h-[calc(100vh-100px)]">
      <div className="flex flex-col gap-6 lg:h-[calc(100vh-100px)] lg:flex-row">
        {/* Left Sidebar - Mini Calendar */}
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-lg border bg-transparent"
          />
        </div>

        {/* Main Content - Calendar View */}
        <div className="flex-1 overflow-auto rounded-lg bg-[#F7F7F7] px-4 py-6 sm:p-8">
          {/* Header */}
          <div className="mb-7 flex items-center gap-8">
            <div className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#AAAAAA]">
              Today
            </div>
            <h2 className="text-xl font-semibold text-[#5C5C5C]">
              {format(selectedDate, 'EEEE d, yyyy')}
            </h2>
            <div className="flex gap-3.5">
              <Button
                onClick={handlePreviousDay}
                aria-label="Previous day"
                size="icon-sm"
                className="rounded-full bg-white text-[#5D5D5D] hover:bg-black hover:text-white [&_svg:not([class*='size-'])]:size-5"
              >
                <ChevronLeft />
              </Button>
              <Button
                onClick={handleNextDay}
                aria-label="Next day"
                size="icon-sm"
                className="rounded-full bg-white text-[#5D5D5D] hover:bg-black hover:text-white [&_svg:not([class*='size-'])]:size-5"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <CalendarView date={selectedDate} events={events} />
        </div>
      </div>
    </section>
  );
};

export default BookingsPage;
