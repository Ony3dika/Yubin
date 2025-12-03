"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.png";
import {
  LayoutDashboard,
  LogOut,
  Inbox,
  Calendar,
  LayoutTemplate,
  Bolt,
} from "lucide-react";
import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
const items = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Inbox", url: "/app/inbox", icon: Inbox },
  { title: "Calendar", url: "/app/calendar", icon: Calendar },
  { title: "Templates", url: "/app/calendar", icon: LayoutTemplate },
];

const AppSidebar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <Sidebar className='py-5' collapsible={"icon"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className={"py-5"} asChild>
              <Link href={"/app"}>
                <Image src={logo} width={40} height={40} alt='styla' />
                <span className='text-primary hover:text-primary/90 text-3xl font-bold'>
                  Yubin
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Automation</SidebarGroupLabel>
          <SidebarGroupContent>
            {" "}
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
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
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  router.push("/app/settings");
                }}
              >
                <Bolt />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  queryClient.invalidateQueries({ queryKey: ["documents"] });
                  supabase.auth.signOut();
                  router.push("/");
                }}
                className={"hover:text-red-500 text-red-500/70 cursor-pointer"}
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
