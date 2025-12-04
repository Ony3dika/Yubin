// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { LoaderCircle } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        // Save user info or redirect
        router.push("/app");
      } else if (error) {
        console.error(error);
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className='h-screen flex justify-center items-center p-5'>
      <div className='flex items-center gap-2'>
        {" "}
        <p className='text-3xl font-semibold'>Signing in...</p>
        <LoaderCircle className='animate-spin' />
      </div>{" "}
    </div>
  );
}
