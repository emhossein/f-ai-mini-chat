"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Moon, Sun, MonitorSmartphone } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, signOutUser, loading } = useAuth();
  const { theme, setTheme } = useTheme(); // Removed effectiveTheme as it's not used here

  return (
    <header className="glass-header p-4 fixed top-0 left-0 right-0 z-20 flex items-center justify-between">
      {" "}
      {/* Applied glass-header, removed shadow-sm */}
      <div className="flex-1 flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Toggle theme">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {" "}
            {/* Popovers/Dropdowns will get blur via global style for bg-popover */}
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <MonitorSmartphone className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h1 className="text-2xl font-headline text-primary text-center flex-shrink-0 px-4">
        Chatty
      </h1>
      <div className="flex-1 flex justify-end">
        {!loading && user && (
          <Button
            variant="ghost"
            size="sm"
            onClick={signOutUser}
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5 mr-2 sm:mr-0" />
            <span className="hidden sm:inline ml-2">Sign Out</span>
          </Button>
        )}
      </div>
    </header>
  );
}
