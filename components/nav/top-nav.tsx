import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Credits from "@/components/nav/credits";
import { currentUser } from "@clerk/nextjs/server";
import { Toaster } from "react-hot-toast";

export default async function TopNav() {
  const user = await currentUser();

  return (
    <Menubar className="flex items-center rounded-none h-14">
      <div className="flex-none">
        <MenubarMenu>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="ai video generator logo"
              width={50}
              height={50}
            />
          </Link>
        </MenubarMenu>
      </div>

      <div className="flex flex-grow items-center justify-end gap-3">
        {user && (
          <MenubarMenu>
            <Link href="/buy-credits">
              <Credits />
            </Link>
          </MenubarMenu>
        )}

        <MenubarMenu>
          <MenubarTrigger className="text-base font-normal">
            Dashboard
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/dashboard">Go to Dashboard</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Link href="/dashboard/create-video">Create Video</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </MenubarMenu>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <Toaster />
    </Menubar>
  );
}
