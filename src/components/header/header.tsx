"use server";
import UserDropdown from "@/components/header/user";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function Header() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm border-border/40">
      <div className="container h-14 flex items-center">
        <Link
          href="/"
          className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
        >
          <Image
            className="mr-2"
            src="/logo.svg"
            width={40}
            height={40}
            alt="Keyguests"
          />
          <span className="font-bold text-xl">Keyguests</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          {/*<ModeToggle/>*/}
          {user ? (
            <div className="pl-4">
              <UserDropdown />
            </div>
          ) : (
            <Link href="/me">
              <Button>Get Started</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
