import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { cookies } from "next/headers";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
   const cookieStore = await cookies();
   const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <AppSidebar />
        <main className='bg-background md:my-5 w-full md:rounded-lg md:mr-4'>
          <Navbar />
          {children}
        </main>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default AppLayout;
