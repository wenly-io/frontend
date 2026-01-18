'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from '@/lib/schemas/whatsapp-schema';
import type { WhatsAppStep } from './connect-whatsapp-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface VerifyCodeStepProps {
  onStepChange: (step: WhatsAppStep) => void;
}

const VerifyCodeStep = ({ onStepChange }: VerifyCodeStepProps) => {
  const form = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      verificationCode: '',
    },
  });
  const { handleSubmit } = form;

  const handleVerifyCode = async (data: VerifyOtpFormData) => {
    console.log(data);
    onStepChange('success');
  };

  return (
    <>
      <DialogHeader className="mb-5 items-center">
        <DialogTitle className="text-2xl">OTP Sent!</DialogTitle>
        <DialogDescription className="mx-auto max-w-75 text-center">
          Enter OTP sent to your WhatsApp inbox here or reply to the message to
          verify
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleVerifyCode)}
          noValidate
          className="space-y-10"
        >
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem className="justify-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full font-bold">
            Verify
          </Button>
        </form>
      </Form>
    </>
  );
};

export default VerifyCodeStep;
