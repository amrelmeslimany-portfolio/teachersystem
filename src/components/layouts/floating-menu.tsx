"use client";
import React from "react";
import { Button } from "../ui/button";
import { Home, ListTodo, MonitorPlay, Notebook } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import { usePathname } from "next/navigation";
import { FloatingLinkType } from "@/lib/types";

const FloatingMenu = () => {
    const pathname = usePathname();

    const links: FloatingLinkType[] = [
        {
            href: Routes.student.dashboard,
            icon: Home,
            title: "الرئيسية",
        },
        {
            href: Routes.student.lessons,
            icon: MonitorPlay,
            title: "الدروس",
        },
        {
            href: Routes.student.quizzes,
            icon: ListTodo,
            title: "الامتحانات",
        },
        {
            href: Routes.student.notes,
            icon: Notebook,
            title: "الملاحظات",
        },
    ];

    return (
        <div className="fixed z-10 flex gap-4 rounded-full inset-x-1/2 translate-x-1/2 p-2 bg-primary/5 w-fit bottom-4  border dark:border-gray-800 border-gray-100 backdrop-blur-xl">
            {links.map((item) => (
                <Button
                    key={item.title}
                    variant={pathname == item.href ? "default" : "ghost"}
                    className="rounded-full"
                    asChild
                >
                    <Link href={item.href}>
                        <item.icon className="h-4 w-4 me-2" />
                        <span>{item.title}</span>
                    </Link>
                </Button>
            ))}
        </div>
    );
};

export default FloatingMenu;
