import { z } from 'zod';

// Step 1: Enter Phone Number
export const enterPhoneNumberSchema = z.object({
  countryCode: z.string().min(1, 'Select a country'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
});

export type EnterPhoneNumberFormData = z.infer<typeof enterPhoneNumberSchema>;

// Step 2: Verify OTP
export const verifyOtpSchema = z.object({
  verificationCode: z
    .string()
    .min(6, 'Verification code must be at least 6 characters')
    .regex(/^[A-Z0-9]+$/, 'Invalid verification code format'),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;
