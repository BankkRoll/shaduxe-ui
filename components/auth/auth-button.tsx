// src/components/auth/auth-button.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronRight, LogOut, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

interface AuthButtonProps {
  user: User | null;
}

const AuthButton: React.FC<AuthButtonProps> = ({ user: initialUser }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [user, setUser] = useState<User | null>(initialUser);
  const supabase = createClient();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (user) {
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="cursor-pointer p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                fetchPriority="high"
                className="rounded-full"
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.name || "User avatar"}
              />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">User menu</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-100 w-60 p-2" align="end">
          <div className="flex items-center gap-2 p-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                className="rounded-full border border-border"
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.name || "User avatar"}
              />
              <AvatarFallback className="rounded-full">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">
                {user.user_metadata.name || user.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {user.email || "No email"}
              </p>
            </div>
          </div>

          <div className="border-t my-2"></div>

          <div className="grid gap-1">
            <Link href="/dashboard" passHref>
              <Button
                variant="ghost"
                className="cursor-pointer w-full justify-start h-9 px-2"
              >
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="cursor-pointer w-full justify-start h-9 px-2"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Link href="/auth/sign-in" passHref>
      <Button size="sm" className="gap-1 group">
        Sign in
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </Link>
  );
};

export default AuthButton;
