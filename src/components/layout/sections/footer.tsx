import Image from "next/image";
import Link from "next/link";
import React from "react";

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 md:py-0 border-t border-border/40">
      <div className="container flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-center text-black text-sm leading-loose text-muted-foreground">
          <Link href="#" className="flex font-bold items-center">
            <Image
              className="mr-2"
              src="/logo.svg"
              width={40}
              height={40}
              alt="MooncakeClub"
            />{" "}
            <span className="text-2xl">Keyguests</span>
          </Link>
        </p>
        <h3 className="">
          &copy; {currentYear} Keyguests. All rights reserved.
        </h3>
      </div>
    </footer>
  );
};
