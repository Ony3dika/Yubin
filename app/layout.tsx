import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { TanstackProvider } from "@/providers/tanstack-provider";
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yubin",
  description: "Manage Emails & Appointments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`bg-sidebar ${dmSans.className} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <TanstackProvider>
        <Toaster richColors theme='system' closeButton position='top-right' />
        {children}
        </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
