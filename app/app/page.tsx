"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Calendar,
  CheckCircle2,
  MoreHorizontal,
  FileText,
  Zap,
  Plus,
  ArrowRight,
  Clock,
  ExternalLink,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  return (
    <div className='flex h-full flex-col'>
      <div className='flex-1 space-y-4 md:p-8 p-4 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          <div className='flex items-center space-x-2'>
            <Button>Download Report</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Emails Processed
              </CardTitle>
              <Mail className='h-4 w-4 text-primary' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-primary'>+128</div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Meetings Booked
              </CardTitle>
              <Calendar className='h-4 w-4 text-primary' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-primary'>+12</div>
              <p className='text-xs text-muted-foreground'>
                +4 since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Pending Approvals
              </CardTitle>
              <CheckCircle2 className='h-4 w-4 text-primary' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-primary'>4</div>
              <p className='text-xs text-muted-foreground'>
                Requires your attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className=''>
          {/* Main Activity Feed */}
          <Card className='border-none shadow-none bg-transparent'>
            <CardHeader className='px-0'>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent parsed items and actions.
              </CardDescription>
            </CardHeader>
            <CardContent className='px-0'>
              {/* Quick Actions Toolbar */}
              <div className='flex items-center gap-2 mb-6 '>
                <Button variant='outline' size='sm' className='h-8'>
                  <Zap className='mr-2 h-4 w-4' />
                  Bulk Reply
                </Button>

                <Button variant='outline' size='sm' className='h-8'>
                  <Plus className='mr-2 h-4 w-4' />
                  Create Template
                </Button>
              </div>

              <section className='flex md:flex-row flex-col  gap-4'>
                {/* Recent Parsed Items List */}
                <div className='space-y-4 basis-full'>
                  {[1, 2, 3, 5].map((item) => (
                    <div
                      key={item}
                      className='flex items-center justify-between p-4 border rounded-xl bg-card hover:bg-sidebar-accent-foreground/20 transition-colors'
                    >
                      <div className='flex items-center gap-4'>
                        <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center'>
                          <Mail className='h-5 w-5 text-primary' />
                        </div>
                        <div>
                          <p className='font-medium'>
                            Invoice #102{item} received
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            From: billing@example.com • 2m ago
                          </p>
                        </div>
                      </div>
                      <Button
                        className='hover:bg-sidebar-accent-foreground/10'
                        variant='ghost'
                        size='icon'
                      >
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </div>
                {/* Right Panel */}
                <div className='basis-[30%] flex flex-col gap-y-4 md:mt-0 mt-5'>
                  {/* Suggestions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-base'>Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent className='grid gap-4'>
                      <div className='flex items-start gap-3'>
                        <div className='mt-1 bg-blue-500/10 p-1.5 rounded'>
                          <Zap className='h-4 w-4 text-blue-500' />
                        </div>
                        <div className='space-y-1'>
                          <p className='text-sm font-medium leading-none'>
                            Automate "Weekly Report"
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            You send this every Monday.
                          </p>
                          <Button variant='link' className='h-auto p-0 text-xs'>
                            Set up automation{" "}
                            <ArrowRight className='ml-1 h-3 w-3' />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Meetings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className='text-base'>
                        Upcoming Meetings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        <div className='flex items-center gap-3'>
                          <div className='flex flex-col items-center justify-center h-10 w-10 rounded bg-muted'>
                            <span className='text-xs font-bold'>DEC</span>
                            <span className='text-sm font-bold'>04</span>
                          </div>
                          <div className='space-y-1'>
                            <p className='text-sm font-medium leading-none'>
                              Product Review
                            </p>
                            <p className='text-xs text-muted-foreground flex items-center'>
                              <Clock className='mr-1 h-3 w-3' /> 10:00 AM -
                              11:00 AM
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='flex flex-col items-center justify-center h-10 w-10 rounded bg-muted'>
                            <span className='text-xs font-bold'>DEC</span>
                            <span className='text-sm font-bold'>04</span>
                          </div>
                          <div className='space-y-1'>
                            <p className='text-sm font-medium leading-none'>
                              Client Sync
                            </p>
                            <p className='text-xs text-muted-foreground flex items-center'>
                              <Clock className='mr-1 h-3 w-3' /> 2:00 PM - 2:30
                              PM
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Right Panel */}
        </div>
      </div>
    </div>
  );
}
