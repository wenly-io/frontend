'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { CalendarDays, Clock, MoveUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { SwirlIcon, WenlyLogoIcon, WhatsAppIcon } from '../icons';
import { Button } from '../ui/button';

const items = [
  {
    title: 'Bookings',
    url: '/bookings',
    icon: CalendarDays,
  },
  {
    title: 'Availability',
    url: '/availability',
    icon: Clock,
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const pathname = usePathname();

  const isActive = (url: string) => pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            className={cn(
              state === 'expanded' ? 'self-start px-4' : 'mb-2 self-center'
            )}
          >
            <Link href="/">
              <Image
                src="/svgs/wenly-logo.svg"
                alt="Wenly Logo"
                width={35}
                height={35}
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {state === 'expanded' && (
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
                      Synchronize your Business WhatsApp for the best
                      experience, click connect to begin.
                    </p>
                  </div>

                  <Button>
                    Connect WhatsApp <MoveUpRight />
                  </Button>
                </div>
              )}

              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    size="lg"
                    className="group/menu-button"
                    isActive={isActive(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon strokeWidth={1.6} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 border-t p-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
            }}
          />
          {state === 'expanded' && <span>Settings</span>}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
