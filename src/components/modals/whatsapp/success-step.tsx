import Image from 'next/image';

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const SuccessStep = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        src="/svgs/success-tick.svg"
        alt="Success"
        width={157}
        height={130}
      />

      <DialogHeader className="items-center">
        <DialogTitle className="text-3xl">Successful</DialogTitle>
        <DialogDescription className="max-w-[300PX] text-center">
          You have connected your WhatsApp Business to Wenly
        </DialogDescription>
      </DialogHeader>
    </div>
  );
};

export default SuccessStep;
