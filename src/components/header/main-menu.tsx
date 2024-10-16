"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MainMenu() {
  const pathname = usePathname();
  return (
    <nav className="flex">
      <Link href="/" className="mr-8 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">Home</span>
      </Link>
      <div className="flex items-center space-x-8">
        <NavigationMenu>
          <NavigationMenuList>
            <Link href="/docs" legacyBehavior passHref>
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link href="/docs" legacyBehavior passHref>
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link href="/docs" legacyBehavior passHref>
              <Button variant="ghost">Docs</Button>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

export default MainMenu;
