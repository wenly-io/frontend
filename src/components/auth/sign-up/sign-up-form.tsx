'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, UserRound } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { GoogleIcon } from '@/components/icons';

// Validation schema for sign-up form
export const createUserSchema = z
  .object({
    fullName: z.string().min(1, 'Please enter your full name'),
    email: z.email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/^\S+$/, 'Password cannot contain spaces')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: z.infer<typeof createUserSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 sm:space-y-6">
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="focus-within:border-ring focus-within:ring-ring/50 flex items-center rounded-md border pl-4 outline-none focus-within:ring-[3px]">
                      <UserRound
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                      <Input
                        {...field}
                        autoFocus
                        type="text"
                        placeholder="Enter your name"
                        className="border-none outline-hidden focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="focus-within:border-ring focus-within:ring-ring/50 flex items-center rounded-md border pl-4 outline-none focus-within:ring-[3px]">
                      <Mail
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="border-none outline-hidden focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="focus-within:border-ring focus-within:ring-ring/50 flex items-center rounded-md border pl-4 outline-none focus-within:ring-[3px]">
                      <Lock
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter 8 digit password"
                        className="border-none outline-hidden focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Must contain at least 8 characters, one uppercase, one
                    lowercase, one number, and one special character.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="focus-within:border-ring focus-within:ring-ring/50 flex items-center rounded-md border pl-4 outline-none focus-within:ring-[3px]">
                      <Lock
                        size={14}
                        className="text-muted-foreground shrink-0"
                      />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm 8 digit password"
                        className="border-none outline-hidden focus-visible:ring-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-11 sm:gap-4.5">
            <Button type="submit" size="lg" className="w-full font-semibold">
              Create Account
            </Button>

            <span className="text-muted-foreground text-xs">OR</span>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full font-semibold"
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="hover:text-primary/80 font-medium text-black transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
