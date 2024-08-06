"use client";

import { DarkModeToggler } from "@/components/shared/darkmode-toggler";
import UserDropdown from "@/components/shared/user-dropdown";
import { Button } from "@/components/ui/button";
import { selectUser } from "@/features/auth/auth-slice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";

export default function Navbar() {
    const user = useAppSelector(selectUser);

    const LoginButtons = (
        <>
            <Button variant="outline" asChild>
                <Link href="/auth/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild>
                <Link href="/auth/register">حساب جديد</Link>
            </Button>
        </>
    );

    return (
        <div className="navbar">
            <Link href="/">
                د<b>ر</b>س
            </Link>
            <div className="flex gap-2.5 !me-0">
                {user ? <UserDropdown user={user} /> : LoginButtons}

                <DarkModeToggler />
            </div>
        </div>
    );
}
