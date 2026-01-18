import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { COUNTRIES_WITH_CODES } from '@/components/data/countries';
import {
  enterPhoneNumberSchema,
  type EnterPhoneNumberFormData,
} from '@/lib/schemas/whatsapp-schema';
import type { WhatsAppStep } from './connect-whatsapp-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface EnterNumberStepProps {
  onStepChange: (step: WhatsAppStep) => void;
}

const EnterNumberStep = ({ onStepChange }: EnterNumberStepProps) => {
  const form = useForm<EnterPhoneNumberFormData>({
    resolver: zodResolver(enterPhoneNumberSchema),
    defaultValues: {
      countryCode: 'NG',
      phoneNumber: '',
    },
  });
  const { handleSubmit } = form;

  const handleSendCode = async (data: EnterPhoneNumberFormData) => {
    console.log('Phone Number Data:', data);
    onStepChange('verify-code');
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Connect WhatsApp Business Number</DialogTitle>
        <DialogDescription>
          Enter your WhatsApp Business number to start receiving appointment
          bookings
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit(handleSendCode)} noValidate>
          <Label className="mb-3 text-[#202020CC]">Whatsapp Number</Label>
          <div className="mb-8 flex gap-2">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-75">
                        {COUNTRIES_WITH_CODES.map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span className="text-xs">
                                {country.phoneCode}
                              </span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter your number"
                      {...field}
                      type="tel"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="lg" className="w-full font-bold">
            Connect WhatsApp
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EnterNumberStep;
