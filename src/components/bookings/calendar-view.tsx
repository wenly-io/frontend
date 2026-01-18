'use client';

import { useMemo, useState, useRef } from 'react';
import { format } from 'date-fns';
import type { CalendarEvent } from './bookings-page';
import { CalendarDays } from 'lucide-react';

interface CalendarViewProps {
  date: Date;
  events: CalendarEvent[];
}

// Constants for tooltip positioning
const TOOLTIP_GAP = 10; // Fixed gap between event bottom and tooltip in pixels

/**
 * Responsive CalendarView with scrollable layout
 *
 * - Events maintain their actual size and width
 * - Content scrolls instead of compacting on smaller screens
 * - Full height time slots always visible
 * - Mobile-friendly with proper scrolling
 */
export function CalendarView({ date, events }: CalendarViewProps) {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter events for selected date
  const dayEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = event.start.toDateString();
      const selectedDate = date.toDateString();
      return eventDate === selectedDate;
    });
  }, [events, date]);

  // Group overlapping events and calculate positions
  const eventLayout = useMemo(() => {
    const layout: Array<{
      event: CalendarEvent;
      top: number;
      height: number;
      left: number;
      width: number;
      groupIndex: number;
      groupSize: number;
    }> = [];

    // Group overlapping events
    const groups: CalendarEvent[][] = [];

    dayEvents.forEach((event) => {
      let placed = false;

      for (const group of groups) {
        const overlaps = group.some((existing) => {
          return (
            (event.start < existing.end && event.end > existing.start) ||
            (existing.start < event.end && existing.end > event.start)
          );
        });

        if (overlaps) {
          group.push(event);
          placed = true;
          break;
        }
      }

      if (!placed) {
        groups.push([event]);
      }
    });

    // Calculate layout for each event
    dayEvents.forEach((event) => {
      const startMinutes =
        event.start.getHours() * 60 + event.start.getMinutes();
      const endMinutes = event.end.getHours() * 60 + event.end.getMinutes();
      const duration = endMinutes - startMinutes;

      // Find group for this event
      let groupIndex = 0;
      let groupSize = 1;

      for (const group of groups) {
        if (group.includes(event)) {
          groupIndex = group.indexOf(event);
          groupSize = group.length;
          break;
        }
      }

      // Calculate position (each hour = 60px, each minute = 1px)
      const top = startMinutes;
      const height = duration;

      // Calculate width based on group (each event gets 1/groupSize width minus padding)
      const width = 100 / groupSize - (groupSize > 1 ? 2 : 0);
      const left = (100 / groupSize) * groupIndex + (groupSize > 1 ? 1 : 0);

      layout.push({
        event,
        top,
        height,
        left,
        width,
        groupIndex,
        groupSize,
      });
    });

    return layout;
  }, [dayEvents]);

  // Handle mouse enter
  const handleMouseEnter = (
    event: CalendarEvent,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredEventId(event.id);

    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      const eventTopRelativeToContainer = rect.top - containerRect.top;
      const eventHeight = rect.height;
      const tooltipTopPosition =
        eventTopRelativeToContainer + eventHeight + TOOLTIP_GAP;

      setTooltipPos({
        x: rect.left - containerRect.left,
        y: tooltipTopPosition,
      });
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredEventId(null);
  };

  // Get hovered event
  const hoveredEvent = hoveredEventId
    ? dayEvents.find((e) => e.id === hoveredEventId)
    : null;

  // Generate time slots (0-23 hours)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-1 flex-col overflow-hidden bg-white"
      onMouseLeave={handleMouseLeave}
    >
      {/* Time grid - scrollable container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Time labels column - FIXED WIDTH, no scroll */}
        <div className="w-20 shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50">
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex h-16 shrink-0 items-start justify-center border-b border-gray-200 pt-1 text-xs font-medium text-gray-500"
            >
              {hour === 0
                ? '12 AM'
                : hour < 12
                  ? `${hour} AM`
                  : hour === 12
                    ? '12 PM'
                    : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        {/* Calendar grid - SCROLLABLE in both directions */}
        <div className="flex-1 overflow-auto">
          {/* Use min-width to prevent compacting */}
          <div
            className="relative min-w-full bg-white"
            style={{ minHeight: '100%' }}
          >
            {/* Horizontal grid lines */}
            {hours.map((hour) => (
              <div
                key={`grid-${hour}`}
                className="absolute h-16 w-full shrink-0 border-b border-gray-100"
                style={{
                  top: `${hour * 64}px`, // 64px = 60px + 4px border
                }}
              />
            ))}

            {/* Events */}
            <div className="absolute inset-0">
              {eventLayout.map((item) => (
                <div
                  key={item.event.id}
                  className="absolute w-fit cursor-pointer rounded-md px-2 py-1 text-white transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: item.event.color,
                    top: `${item.top}px`,
                    height: `${item.height}px`,
                    left: `${item.left}%`,
                    marginLeft: '2px',
                    marginRight: '2px',
                    minHeight: '40px',
                  }}
                  onMouseEnter={(e) => handleMouseEnter(item.event, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="mb-0.5 truncate text-xs font-semibold">
                    {item.event.title}
                  </div>
                  <div className="truncate text-xs font-medium opacity-90">
                    {format(item.event.start, 'HH:mm a')} -{' '}
                    {format(item.event.end, 'HH:mm a')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip - positioned below event with CONSISTENT gap */}
      {hoveredEvent && (
        <div
          className="pointer-events-none absolute z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            whiteSpace: 'nowrap',
          }}
        >
          <div className="flex gap-2">
            <CalendarDays
              className="text-muted-foreground foreground mt-1 size-4.5 shrink-0"
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <h3 className="mb-1 truncate text-lg font-semibold text-gray-900">
                {hoveredEvent.title}
              </h3>
              <p className="text-sm font-medium text-[#999DB0]">
                {format(date, 'EEEE, MMMM d')} •{' '}
                {format(hoveredEvent.start, 'h:mm a')} -{' '}
                {format(hoveredEvent.end, 'h:mm a')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
