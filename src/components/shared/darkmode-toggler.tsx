"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modes } from "@/lib/enums";

export function DarkModeToggler() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="focus-within:outline-none">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">الوضع الليلي</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme(Modes.LIGHT)}>النهار</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(Modes.DARK)}>الليل</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(Modes.SYSTEM)}>النظام</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
