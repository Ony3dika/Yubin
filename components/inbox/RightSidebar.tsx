"use client";

import * as React from "react";
import { useInboxStore } from "@/hooks/useInboxStore";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RightSidebar() {
  const { emails, selectedEmailIds, currentEmailId } = useInboxStore();

  const selectedEmails = emails.filter((e) => selectedEmailIds.has(e.id));
  const currentEmail = emails.find((e) => e.id === currentEmailId);

  // Determine what to show
  const showBulkActions = selectedEmails.length > 1;
  const showContext = !showBulkActions && currentEmail;

  if (!showBulkActions && !showContext) {
    return (
      <div className='flex h-full items-center justify-center p-8 text-center text-muted-foreground text-sm'>
        Select an email to view context or multiple to perform bulk actions
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center px-4 py-2'>
        <span className='font-medium'>
          {showBulkActions ? "Bulk Actions" : "Context"}
        </span>
      </div>

      <ScrollArea className='flex-1'>
        <div className='p-4 flex flex-col gap-6'>
          {showBulkActions && (
            <div className='flex flex-col gap-4'>
              <div className='text-sm text-muted-foreground'>
                {selectedEmails.length} emails selected
              </div>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Bulk Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className='grid gap-2'>
                  <Button variant='outline' className='justify-start'>
                    Mark as Read
                  </Button>
                  <Button variant='outline' className='justify-start'>
                    Archive
                  </Button>
                  <Button variant='outline' className='justify-start'>
                    Delete
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Variable Mapping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-xs text-muted-foreground mb-2'>
                    Previewing variables for selected recipients.
                  </div>
                  <div className='grid gap-2'>
                    {selectedEmails.slice(0, 3).map((email) => (
                      <div
                        key={email.id}
                        className='flex items-center justify-between text-sm border p-2 rounded'
                      >
                        <span className='truncate max-w-[100px]'>
                          {email.sender.name}
                        </span>
                        <Badge variant='secondary' className='text-[10px]'>
                          Ready
                        </Badge>
                      </div>
                    ))}
                    {selectedEmails.length > 3 && (
                      <div className='text-xs text-center text-muted-foreground'>
                        + {selectedEmails.length - 3} more
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {showContext && currentEmail && (
            <div className='flex flex-col gap-6'>
              {/* Contact Info */}
              <div className='flex flex-col items-center text-center gap-2'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={currentEmail.sender.avatar} />
                  <AvatarFallback>
                    {currentEmail.sender.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className='font-semibold'>
                    {currentEmail.sender.name}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {currentEmail.sender.email}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Previous Interactions (Mock) */}
              <div>
                <h3 className='text-sm font-medium mb-3'>
                  Recent Interactions
                </h3>
                <div className='space-y-3'>
                  <div className='text-sm'>
                    <div className='font-medium text-xs text-muted-foreground mb-1'>
                      Oct 20, 2023
                    </div>
                    <div>Sent proposal for Q4 project.</div>
                  </div>
                  <div className='text-sm'>
                    <div className='font-medium text-xs text-muted-foreground mb-1'>
                      Oct 15, 2023
                    </div>
                    <div>Meeting regarding timeline.</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* CRM Data (Mock) */}
              <div>
                <h3 className='text-sm font-medium mb-3'>CRM Details</h3>
                <div className='grid gap-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Company</span>
                    <span>Acme Inc.</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Role</span>
                    <span>Product Manager</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Status</span>
                    <Badge variant='outline' className='font-normal'>
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
