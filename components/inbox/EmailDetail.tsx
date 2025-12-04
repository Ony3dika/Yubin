"use client";
import {
  Reply,
  ReplyAll,
  Forward,
  MoreVertical,
  Trash2,
  Archive,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useInboxStore } from "@/hooks/useInboxStore";
import { format } from "date-fns";

export function EmailDetail() {
  const { emails, currentEmailId } = useInboxStore();
  const email = emails.find((e) => e.id === currentEmailId);

  if (!email) {
    return (
      <div className='flex h-full items-center justify-center p-8 text-muted-foreground'>
        Select an email to view
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col'>
      {/* Toolbar */}
      <div className='flex items-center justify-between  border-b h-[52px]'>
        <div className='flex items-center gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' disabled={!email}>
                  <Trash2 className='h-4 w-4' />
                  <span className='sr-only'>Move to trash</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Move to trash</TooltipContent>
            </Tooltip>
            <Separator orientation='vertical' className='mx-1 h-6' />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' disabled={!email}>
                  <Clock className='h-4 w-4' />
                  <span className='sr-only'>Snooze</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Snooze</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex items-center gap-2'>
          <Separator orientation='vertical' className='mx-1 h-6' />
          <Button variant='ghost' size='icon' disabled={!email}>
            <MoreVertical className='h-4 w-4' />
            <span className='sr-only'>More</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto'>
        <div className='flex flex-col p-4 gap-4'>
          {/* Header */}
          <div className='flex items-start justify-between'>
            <div className='flex items-start gap-3'>
              {/* Avatar placeholder */}
              <div className='h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-medium'>
                {email.sender.name.charAt(0)}
              </div>
              <div className='grid gap-0.5'>
                <div className='font-semibold text-sm'>{email.sender.name}</div>
                <div className='text-xs text-muted-foreground'>
                  {email.sender.email}
                </div>
              </div>
            </div>
            <div className='text-xs text-muted-foreground'>
              {format(new Date(email.date), "MMM d, yyyy, h:mm a")}
            </div>
          </div>

          <div className='text-lg font-semibold'>{email.subject}</div>

          {/* AI Badge */}
          {email.aiAnalysis && (
            <div className='rounded-lg dark:bg-primary/10 bg-primary/20 p-3  border border-primary/50'>
              <div className='flex items-center gap-2 mb-2'>
                <Sparkles className='h-4 w-4 text-primary' />
                <span className='text-xs font-medium text-primary'>
                  AI Parsed:{" "}
                  {email.aiAnalysis.type.charAt(0).toUpperCase() +
                    email.aiAnalysis.type.slice(1)}
                </span>
              </div>
              <p className='text-sm  mb-3'>
                {email.aiAnalysis.summary}
              </p>
              {email.aiAnalysis.suggestedActions && (
                <div className='flex flex-wrap gap-2'>
                  {email.aiAnalysis.suggestedActions.map((action) => (
                    <Button
                      key={action}
                      variant='outline'
                      size='sm'
                      className='h-7 bg-white dark:bg-background rounded-lg'
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          <Separator />

          {/* Body */}
          <div className='whitespace-pre-wrap text-sm leading-relaxed'>
            {email.body}
          </div>

          <Separator className='my-4' />

          {/* Reply Area */}
          <div className='grid gap-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Reply</span>
              {/* Template picker could go here */}
            </div>
            <Textarea
              placeholder={`Reply to ${email.sender.name}...`}
              className='min-h-[150px]'
              defaultValue={email.aiAnalysis?.draftReply}
            />
            <div className='flex items-center justify-end'>
             
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
