"use client";
import { useEffect, useState } from "react";
import { CircleUser } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { SidebarTrigger } from "./ui/sidebar";
import { ThemeTogglerButton } from "./animate-ui/components/buttons/theme-toggler";
import { supabase } from "@/utils/supabase";
import { useStore } from "@/app/store";
import { Skeleton } from "./ui/skeleton";
import { User } from "@supabase/supabase-js";

export default function Component() {
  const [userData, setUserData] = useState<User | null>(null);
  const { userID, updateUserID } = useStore();

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    setUserData(user);
    if (user) {
      updateUserID(user.id);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [updateUserID]);

  return (
    <header className='px-4'>
      <div className='flex h-16 items-center justify-between gap-4'>
        {/* Left side */}
        <div className='flex flex-1 items-center gap-2'>
          {/* Logo */}
          <SidebarTrigger />
          <div className='flex items-center'></div>
        </div>

        {/* Right side */}
        <div className='flex flex-1 items-center justify-end gap-2'>
          {userData ? (
            <>
              <p className='text-muted-foreground md:text-base text-sm'>
                {userData.email}
              </p>
              <Avatar>
                {userData.user_metadata.avatar_url && (
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full border'
                    src={userData.user_metadata.avatar_url}
                    alt='user'
                  />
                )}

                <AvatarFallback>
                  <CircleUser strokeWidth={1} />
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              {" "}
              <Skeleton className={"h-8 md:w-1/3 w-full"} />
              <Skeleton className={"h-8 w-8 rounded-full"} />
            </>
          )}

          <ThemeTogglerButton />
        </div>
      </div>
    </header>
  );
}
