"use client";
import { useId, useState } from "react";
import Image from "next/image";
import {
  EyeIcon,
  EyeOffIcon,
  LoaderCircle,
  Mail,
  UserRoundCheck,
  UserRoundPlus,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  TabsContent,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { Button } from "@/components/ui/button";
import google from "@/public/google.svg";
import logo from "@/public/logo.png";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const router = useRouter();
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
    email: "",
  });
  const handleEmailLogin = async (e: React.FormEvent) => {
    setIsLoginLoading(true);
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });
    if (error) {
      console.error(error);
      // alert(error);
      toast.error(error.message);
    } else {
      console.log("Logged in:", data);
      toast.success("Logged in successfully!");
      router.push("/app");
    }
    setIsLoginLoading(false);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    setIsSignUpLoading(true);
    e.preventDefault();
    if (userData.password != userData.confirmPassword) {
      toast.error("Passwords do not match!");
      setIsSignUpLoading(false);
      return;
    }
    let { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });
    if (error) {
      console.error(error);

      toast.error(error.message);
    } else {
      console.log("Logged in:", data);
      toast.success("Account created successfully!");
    }
    setIsSignUpLoading(false);
  };
  const handleSignInWithGoogle = async () => {
     const { data, error } = await supabase.auth.signInWithOAuth({
       provider: "google",
       options: {
         redirectTo: `${window.location.origin}/auth/callback`,
       },
     });
     if (error) {
       console.error(error);
       toast.error(error.message);
     }
  };
  return (
    <main className='h-screen lg:flex justify-between md:p-5'>
      <section className='basis-[60%] h-full rounded-2xl px-5 lg:px-20 xl:px-44 2xl:px-56 py-10 flex flex-col justify-evenly '>
        <div className='flex items-center'>
          <Image
            src={logo}
            alt='yubin'
            className='rounded-xs mr-2'
            width={30}
            height={30}
          />

          <p className='text-primary hover:text-primary/90 text-3xl font-bold'>
            Yubin
          </p>
        </div>
        <p className='md:text-lg text-base my-5 italic'>
          Manage Emails & Appointments
        </p>
       
        <Tabs defaultValue='tab-1' className={"w-full flex items-center h-4/5"}>
          <ScrollArea className={"w-4/5"}>
            <TabsList className='bg-background rounded-none w-full h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse'>
              <TabsTrigger
                value='tab-1'
                className='data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-3 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e cursor-pointer'
              >
                <UserRoundCheck
                  className='-ms-0.5 me-1.5 opacity-60'
                  size={16}
                  aria-hidden='true'
                />
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value='tab-2'
                className='data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-3 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e cursor-pointer'
              >
                <UserRoundPlus
                  className='-ms-0.5 me-1.5 opacity-60'
                  size={16}
                  aria-hidden='true'
                />
                Sign Up
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
          {/* Sign In */}
          <TabsContent value='tab-1' className={"w-full"}>
            <p className='my-10 text-sm'>
              Welcome Back <span className='text-primary'>Mailhem</span>
            </p>
            <Button
              onClick={handleSignInWithGoogle}
              variant={"outline"}
              className={"w-full py-5"}
            >
              <Image src={google} alt='google' />
              Sign In with Google
            </Button>
            <form onSubmit={handleEmailLogin} className='w-full'>
              <Input
                required
                type='email'
                placeholder='Email'
                className={"my-5 py-5"}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />

              <div className='relative'>
                <Input
                  id={id}
                  required
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className='pe-9 py-5'
                  placeholder='Password'
                  type={isVisible ? "text" : "password"}
                />
                <button
                  className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                  type='button'
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls='password'
                >
                  {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden='true' />
                  ) : (
                    <EyeIcon size={16} aria-hidden='true' />
                  )}
                </button>
              </div>

              {isLoginLoading ? (
                <Button disabled className={"mt-10 animate-pulse w-full py-6"}>
                  <LoaderCircle className='animate-spin' />
                </Button>
              ) : (
                <Button type='submit' className={"mt-10 w-full py-6"}>
                  Sign In
                </Button>
              )}
            </form>
          </TabsContent>

          {/* Sign UP */}
          <TabsContent value='tab-2' className={"w-full"}>
            <p className='my-10 text-sm'>
              Mail em <span className='text-primary'>Mailhem</span>
            </p>
            <Button
              onClick={handleSignInWithGoogle}
              variant={"outline"}
              className={"w-full py-5"}
            >
              <Image src={google} alt='google' />
              Sign Up with Google
            </Button>
            <form onSubmit={handleEmailSignUp} className='w-full'>
              <Input
                required
                type='email'
                placeholder='Email'
                className={"my-5 py-5"}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />

              <div className='relative'>
                <Input
                  id={id}
                  required
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className='pe-9 py-5'
                  placeholder='Password'
                  type={isVisible ? "text" : "password"}
                />
                <button
                  className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                  type='button'
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls='password'
                >
                  {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden='true' />
                  ) : (
                    <EyeIcon size={16} aria-hidden='true' />
                  )}
                </button>
              </div>

              <div className='relative mt-5'>
                <Input
                  id={id}
                  required
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className='pe-9 py-5'
                  placeholder='Confirm Password'
                  type={isVisible ? "text" : "password"}
                />
                <button
                  className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                  type='button'
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls='password'
                >
                  {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden='true' />
                  ) : (
                    <EyeIcon size={16} aria-hidden='true' />
                  )}
                </button>
              </div>

              {isSignUpLoading ? (
                <Button disabled className={"mt-10 animate-pulse w-full py-6"}>
                  <LoaderCircle className='animate-spin' />
                </Button>
              ) : (
                <Button type='submit' className={"mt-10 w-full py-6"}>
                  Sign Up
                </Button>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </section>

      <section className='basis-[40%] lg:block hidden h-full rounded-2xl background'></section>
    </main>
  );
}
