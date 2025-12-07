"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useInboxStore } from "@/hooks/useInboxStore";
import { mockEmails } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { useFetchEmail } from "@/lib/gmail-actions";
import { useStore } from "../../app/store";

export function EmailList() {
  const {
    setEmails,
    selectedEmailIds,
    toggleSelection,
    currentEmailId,
    setCurrentEmail,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  } = useInboxStore();

  // Initialize with mock data
  React.useEffect(() => {
    setEmails(mockEmails);
  }, [setEmails]);
  const { googleAccessToken } = useStore();

  const { data: emails } = useFetchEmail(googleAccessToken);
  console.log(emails);

  // const filteredEmails = emails?.filter((email: any) => {
  //   const matchesSearch =
  //     email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     email.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     email.preview.toLowerCase().includes(searchQuery.toLowerCase());

  //   if (filter === "unread") return matchesSearch && !email.read;
  //   if (filter === "starred")
  //     return matchesSearch && email.labels.includes("starred");
  //   return matchesSearch;
  // });

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center py-2 gap-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search'
            className='pl-8 h-9 rounded-lg'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Filter Dropdown could go here */}
      </div>
      <ScrollArea className='flex-1 mt-2'>
        {/* <div className='flex flex-col gap-2 p- pt-0 '>
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all duration-200 ease-out hover:bg-accent dark:hover:bg-accent/20 cursor-pointer",
                currentEmailId === email.id && "bg-muted"
              )}
              onClick={() => setCurrentEmail(email.id)}
            >
              <div className='flex w-full flex-col gap-1'>
                <div className='flex items-center'>
                  <div className='flex items-center gap-2'>
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedEmailIds.has(email.id)}
                        onCheckedChange={() => toggleSelection(email.id)}
                      />
                    </div>
                    <div className='font-semibold'>{email.sender.name}</div>
                    {!email.read && (
                      <span className='flex h-2 w-2 rounded-full bg-primary' />
                    )}
                  </div>
                  <div className='ml-auto text-xs text-muted-foreground'>
                  
                    {new Date(email.date).toLocaleDateString()}
                  </div>
                </div>
                <div className='text-xs font-medium'>{email.subject}</div>
              </div>
              <div className='line-clamp-2 text-xs text-muted-foreground'>
                {email.preview.substring(0, 300)}
              </div>
              {email.labels.length > 0 && (
                <div className='flex items-center gap-2'>
                  {email.labels.map((label) => (
                    <Badge
                      key={label}
                      variant='outline'
                      className='text-[10px] px-1 py-0 h-5'
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div> */}
      </ScrollArea>
    </div>
  );
}
