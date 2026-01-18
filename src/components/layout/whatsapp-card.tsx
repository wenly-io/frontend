'use client';

import { useState } from 'react';
import { MoveUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { WhatsAppIcon, SwirlIcon, WenlyLogoIcon } from '../icons';

import ConnectWhatsAppModal from '../modals/whatsapp/connect-whatsapp-modal';

const WhatsAppCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-lg bg-linear-[108deg,#FF6A00_-28.15%,#AD33CF_96.5%] p-6">
        <div className="mb-2.5 flex items-center gap-1">
          <WhatsAppIcon />
          <SwirlIcon />
          <WenlyLogoIcon />
        </div>

        <div className="mb-3">
          <h2 className="mb-2 text-lg leading-5.5 font-semibold text-white">
            Connect your WhatsApp
          </h2>
          <p className="text-xs text-[#FFFFFFB2]">
            Enable WhatsApp bookings so clients can schedule appointments
            instantly
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="w-full">
          Connect WhatsApp <MoveUpRight />
        </Button>
      </div>

      <ConnectWhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default WhatsAppCard;
