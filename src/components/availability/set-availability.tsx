'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Copy, PlusCircle, Trash } from 'lucide-react';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const TIMEZONES = [
  'UTC',
  'EST (Eastern Standard Time)',
  'CST (Central Standard Time)',
  'MST (Mountain Standard Time)',
  'PST (Pacific Standard Time)',
  'GMT (Greenwich Mean Time)',
  'CET (Central European Time)',
  'IST (Indian Standard Time)',
  'JST (Japan Standard Time)',
  'AWST (Australian Western Standard Time)',
  'WAT (West African Time)',
];

// Generate time slots in 15-minute intervals from 00:00 to 23:45
const generateTimeSlots = () => {
  const slots = [];
  for (let hours = 0; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      slots.push(timeString);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

// Format time for display (12-hour format)
const formatTimeDisplay = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? ' PM' : ' AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes}${ampm}`;
};

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  day: string;
  enabled: boolean;
  slots: TimeSlot[];
}

interface AvailabilityFormData {
  timezone: string;
  availability: DayAvailability[];
}

const SetAvailability = () => {
  const form = useForm<AvailabilityFormData>({
    defaultValues: {
      timezone: 'EST (Eastern Standard Time)',
      availability: DAYS.map((day) => ({
        day,
        enabled: day !== 'Sunday' && day !== 'Saturday',
        slots: [{ id: '1', startTime: '09:00', endTime: '17:00' }],
      })),
    },
  });

  const { fields: dayFields } = useFieldArray({
    control: form.control,
    name: 'availability',
  });

  const handleSave = (data: AvailabilityFormData) => {
    console.log('Availability saved:', data);
    // Handle save logic here
  };

  const getDayFieldArray = (dayIndex: number) => {
    return {
      fields: form.getValues(`availability.${dayIndex}.slots`),
      append: (slot: TimeSlot) =>
        form.setValue(`availability.${dayIndex}.slots`, [
          ...form.getValues(`availability.${dayIndex}.slots`),
          slot,
        ]),
      remove: (slotIndex: number) =>
        form.setValue(
          `availability.${dayIndex}.slots`,
          form
            .getValues(`availability.${dayIndex}.slots`)
            .filter((_, index) => index !== slotIndex)
        ),
    };
  };

  return (
    <div className="min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#5C5C5C]">
            Set Availability
          </h1>
          <p className="mt-1 text-sm text-[#9F9F9F]">
            Add hours you&apos;re typically available
          </p>
        </div>
        <Button onClick={form.handleSubmit(handleSave)} size="lg">
          Save
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSave)}
          className="flex flex-wrap gap-7"
        >
          {/* Timezone Selector */}

          {/* Days Availability */}
          <Card className="p-8">
            {dayFields.map((dayField, dayIndex) => {
              const day = form.watch(`availability.${dayIndex}`);
              const {
                fields: slotFields,
                append: appendSlot,
                remove: removeSlot,
              } = getDayFieldArray(dayIndex);

              return (
                <div key={dayField.id} className="flex items-start gap-4">
                  {/* Day Toggle */}
                  <div className="mt-1 flex min-w-fit items-center gap-5">
                    <FormField
                      control={form.control}
                      name={`availability.${dayIndex}.enabled`}
                      render={({ field }) => (
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      )}
                    />
                    <span className="w-22.5 font-medium text-[#959595]">
                      {day.day}
                    </span>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    {day.enabled
                      ? slotFields.map((slotField, slotIndex) => (
                          <div
                            key={slotField.id}
                            className="flex items-center gap-2"
                          >
                            <FormField
                              control={form.control}
                              name={`availability.${dayIndex}.slots.${slotIndex}.startTime`}
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger className="text-[#959595]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60">
                                      {TIME_SLOTS.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {formatTimeDisplay(time)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />

                            <div className="h-0.5 w-2.5 bg-[#959595]" />

                            <FormField
                              control={form.control}
                              name={`availability.${dayIndex}.slots.${slotIndex}.endTime`}
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger className="text-[#959595]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60">
                                      {TIME_SLOTS.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {formatTimeDisplay(time)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />

                            {/* Action Buttons */}
                            <div className="ml-2 flex items-center gap-1">
                              {slotIndex === 0 && slotFields.length === 1 ? (
                                // First and only slot: show + icon
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  type="button"
                                  onClick={() => {
                                    appendSlot({
                                      id: Math.random().toString(),
                                      startTime: '09:00',
                                      endTime: '17:00',
                                    });
                                  }}
                                  className="rounded p-1.5 transition-colors hover:bg-gray-100"
                                  aria-label="Add time slot"
                                >
                                  <PlusCircle className="text-muted-foreground size-4" />
                                </Button>
                              ) : (
                                // Additional slots: show copy and delete
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    type="button"
                                    onClick={() => removeSlot(slotIndex)}
                                    className="rounded p-1.5 transition-colors hover:bg-red-50"
                                    aria-label="Delete time slot"
                                  >
                                    <Trash className="text-destructive size-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    type="button"
                                    onClick={() => {
                                      appendSlot({
                                        id: Math.random().toString(),
                                        startTime: form.getValues(
                                          `availability.${dayIndex}.slots.${slotIndex}.startTime`
                                        ),
                                        endTime: form.getValues(
                                          `availability.${dayIndex}.slots.${slotIndex}.endTime`
                                        ),
                                      });
                                    }}
                                    className="rounded p-1.5 transition-colors hover:bg-gray-100"
                                    aria-label="Duplicate time slot"
                                  >
                                    <Copy className="text-muted-foreground size-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))
                      : ''}
                  </div>
                </div>
              );
            })}
          </Card>

          <Card className="h-fit p-8">
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#202020CC]">Timezone</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="">
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SetAvailability;
