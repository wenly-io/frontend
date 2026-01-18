'use client';

import { useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import EnterNumberStep from './enter-number-step';
import VerifyCodeStep from './verify-code-step';
import SuccessStep from './success-step';

export type WhatsAppStep = 'enter-number' | 'verify-code' | 'success';

interface ConnectWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectWhatsAppModal = ({
  isOpen,
  onClose,
}: ConnectWhatsAppModalProps) => {
  const [step, setStep] = useState<WhatsAppStep>('enter-number');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-8 pt-14 pb-10 sm:p-10">
        {step === 'enter-number' && <EnterNumberStep onStepChange={setStep} />}
        {step === 'verify-code' && <VerifyCodeStep onStepChange={setStep} />}
        {step === 'success' && <SuccessStep />}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWhatsAppModal;
