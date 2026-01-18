'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { CalendarDays, Clock } from 'lucide-react';

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

import WhatsAppCard from './whatsapp-card';

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
              {state === 'expanded' && <WhatsAppCard />}

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
