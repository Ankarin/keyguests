'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {LogOut, CircleUserIcon as UserIcon} from "lucide-react";
import { logout } from "@/actions/auth";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default  function UserDropdown() {
  const router = useRouter()
  const out = async () => {
    await logout();
    router.replace("/");
  };

    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserIcon className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-4">
        <Link href="/me">
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" /> My Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={out} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
