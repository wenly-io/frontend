import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <div className="flex-1 bg-white">
          <header className="flex items-center gap-2 border-b p-4">
            <SidebarTrigger />
            <span className="text-xl font-semibold">Wenly</span>
          </header>
          <main className="p-4 sm:p-5.5">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
