"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gmail from "@/public/gmail.svg";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("gmail_tokens")
          .select("user_id")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  const handleConnect = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) {
      window.location.href = `/api/auth/gmail?access_token=${session.access_token}`;
    } else {
      toast.error("Please sign in to connect Gmail");
    }
  };

  return (
    <main className='p-4'>
      <h2 className='text-2xl font-semibold tracking-tight'>Settings</h2>
      <p className='text-sm text-muted-foreground'>
        Manage you account settings
      </p>

      <section className='flex mt-5'>
        {isLoading ? (
          <Button variant={"outline"} disabled>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Checking...
          </Button>
        ) : isConnected ? (
          <Button
            variant={"outline"}
            className='border-green-500 text-green-600 bg-green-300/20 hover:bg-green-300/30 hover:text-green-600'
          >
            <Image className='h-4 w-4 mr-2' src={gmail} alt='gmail' />
            Gmail Connected
          </Button>
        ) : (
          <Button variant={"outline"} onClick={handleConnect}>
            <Image className='h-4 w-4 mr-2' src={gmail} alt='gmail' />
            Connect Gmail
          </Button>
        )}
      </section>
    </main>
  );
};

export default Settings;
