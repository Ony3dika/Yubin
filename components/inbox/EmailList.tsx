"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useInboxStore } from "@/hooks/useInboxStore";
import { mockEmails } from "@/lib/mock-data";
import { useFetchEmail } from "@/lib/gmail-actions";
import { useStore } from "../../app/store";
import Markdown from "react-markdown";
import { Email } from "@/hooks/useInboxStore";
import { Skeleton } from "../ui/skeleton";
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
  } = useInboxStore();

  const { googleAccessToken } = useStore();

  const { data: emails, isPending } = useFetchEmail(googleAccessToken);
  // console.log(emails);

  React.useEffect(() => {
    setEmails(emails);
  }, [emails]);

  const filteredEmails = emails?.filter((email: Email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "unread") return matchesSearch && !email.read;
    if (filter === "starred")
      return matchesSearch && email.labels.includes("starred");
    return matchesSearch;
  });

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
        <div className='flex flex-col gap-2'>
          {isPending &&
            [1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className='w-full items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all animate-pulse'
              >
                <Skeleton className='h-8 w-2/3' />

                <Skeleton className='h-12 my-2' />
              </div>
            ))}
          {filteredEmails?.map((email: Email) => (
            <div
              key={email.id}
              className={cn(
                "flex flex-col relative w-full items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all duration-200 ease-out hover:bg-accent dark:hover:bg-accent/20 cursor-pointer",
                currentEmailId === email.id && "bg-muted"
              )}
              onClick={() => setCurrentEmail(email.id)}
            >
              <div className='flex w-full flex-col gap-1'>
                <div className='flex items-center'>
                  <div className='flex items-center gap-1'>
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedEmailIds.has(email.id)}
                        onCheckedChange={() => toggleSelection(email.id)}
                      />
                    </div>
                    {/* {!email.read && (
                      <span className='flex h-2 w-2 rounded-full bg-primary' />
                    )} */}
                    <span className='font-medium text-sm'>{email.from}</span>
                  </div>
                  <span className='text-xs ml-auto text-muted-foreground'>
                    {new Date(email.date).toLocaleDateString("en-US", {
                      day: "numeric",

                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className='text-xs font-medium'>
                  <Markdown>{email.subject}</Markdown>
                </p>
              </div>
              <p className='text-xs truncate w-64 text-muted-foreground'>
                <Markdown>{email.body.substring(0, 100)}</Markdown>
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
