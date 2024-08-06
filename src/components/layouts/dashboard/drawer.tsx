"use client";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Modes } from "@/lib/enums";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
    BookCheck,
    BookCopy,
    Home,
    Hourglass,
    Menu,
    Moon,
    Notebook,
    Presentation,
    Settings,
    SquareStack,
    User,
    UsersRound,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

type LinkType = {
    href?: string;
    label: string;
    type: "link" | "divider";
    icon?: any;
    isActive?: boolean;
};

export const DrawerTeacher = () => {
    const pathname = usePathname();
    const { setTheme, theme } = useTheme();

    const items: LinkType[] = [
        {
            label: "الرئيسية",
            href: Routes.teacher.home,
            icon: Home,
            isActive: pathname === Routes.teacher.home,
            type: "link",
        },
        {
            label: "المناهج",
            type: "divider",
        },
        {
            label: "الاختبارات",
            href: Routes.teacher.quizzes.home,
            icon: BookCheck,
            isActive: pathname === Routes.teacher.quizzes.home,
            type: "link",
        },
        {
            label: "الوحدات",
            href: Routes.teacher.units.home,
            icon: BookCopy,
            isActive: pathname === Routes.teacher.units.home,
            type: "link",
        },
        {
            label: "الدروس",
            href: Routes.teacher.lessons.home,
            icon: Presentation,
            isActive: pathname === Routes.teacher.lessons.home,
            type: "link",
        },

        {
            label: "الملاحظات",
            href: Routes.teacher.notes.home,
            icon: Notebook,
            isActive: pathname === Routes.teacher.notes.home,
            type: "link",
        },

        {
            label: "المستخدمين",
            type: "divider",
        },
        {
            label: "المراحل الدراسية",
            href: Routes.teacher.levels.home,
            icon: SquareStack,
            isActive: pathname === Routes.teacher.levels.home,
            type: "link",
        },
        {
            label: "المجموعات",
            href: Routes.teacher.groups.home,
            icon: UsersRound,
            isActive: pathname === Routes.teacher.groups.home,
            type: "link",
        },
        {
            label: "الطلاب",
            href: Routes.teacher.students.home,
            icon: User,
            isActive: pathname === Routes.teacher.students.home,
            type: "link",
        },
        {
            label: "أخري",
            type: "divider",
        },
        {
            label: "الجداول الزمنية",
            href: Routes.teacher.weekdays.home,
            icon: UsersRound,
            isActive: pathname === Routes.teacher.weekdays.home,
            type: "link",
        },

        {
            label: "الفصول الدراسية",
            href: Routes.teacher.terms.home,
            icon: Hourglass,
            isActive: pathname === Routes.teacher.terms.home,
            type: "link",
        },
    ];

    const menuButton = (item: Required<LinkType>) => (
        <SheetClose asChild key={item.label}>
            <Button
                variant="ghost"
                className={cn(["justify-start text-base", item.isActive ? "bg-primary/5 dark:bg-primary/40" : ""])}
                asChild
            >
                <Link href={item.href}>
                    <item.icon className="w-5 h-5 me-4" />
                    {item.label}
                </Link>
            </Button>
        </SheetClose>
    );

    return (
        <Sheet>
            <SheetTrigger>
                <Menu />
            </SheetTrigger>
            <SheetContent className="w-80 overflow-y-auto">
                <SheetHeader className="mb-4 ">
                    <SheetTitle className="text-start">القائمة الرئيسيه</SheetTitle>
                </SheetHeader>
                <div>
                    <div className="flex space-y-1 flex-col w-full">
                        {items.map((item) => {
                            return item.type === "link" ? (
                                menuButton(item as Required<LinkType>)
                            ) : (
                                <small key={item.label} className="text-sm text-gray-500 my-2 block">
                                    {item.label}
                                </small>
                            );
                        })}
                    </div>
                </div>
                <SheetFooter className="pt-4 border-t mt-4 gap-2">
                    <Button variant="outline" size={"icon"}>
                        <Settings className="w-5 h-5" />
                    </Button>
                    <Button
                        variant={theme == Modes.DARK ? "default" : "outline"}
                        size={"icon"}
                        onClick={() => setTheme(theme == Modes.DARK ? Modes.LIGHT : Modes.DARK)}
                    >
                        <Moon className="w-5 h-5" />
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
