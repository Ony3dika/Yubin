"use client";

import * as React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

import { EmailList } from "./EmailList";
import { EmailDetail } from "./EmailDetail";

import { RightSidebar } from "./RightSidebar";

interface InboxLayoutProps {
  defaultLayout?: number[] | undefined;
  navCollapsedSize?: number;
}

export function InboxLayout({
  defaultLayout = [25, 45, 30],
  navCollapsedSize,
}: InboxLayoutProps) {
  return (
    <div className='md:h-[80vh] p-4 w-full'>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className='h-full items-stretch'
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          minSize={20}
          maxSize={30}
          className='min-w-[250px] [scrollbar-color:--alpha(var(--border)/50%)_transparent] [scrollbar-width:thin]'
        >
          <div className='flex h-full flex-col'>
            <div className='flex items-center  border-b h-[52px]'>
              <h1 className='text-xl font-bold'>Inbox</h1>
            </div>
            <div className='flex-1 overflow-y-auto'>
              <EmailList />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel
          className='[scrollbar-color:--alpha(var(--border)/50%)_transparent] [scrollbar-width:thin]'
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
          <div className='flex h-full flex-col'>
            <div className='flex-1 overflow-y-auto'>
              <EmailDetail />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={defaultLayout[2]} minSize={20}>
          <div className='flex h-full flex-col'>
            <div className='flex-1 overflow-y-auto'>
              {/* <RightSidebar /> */}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
