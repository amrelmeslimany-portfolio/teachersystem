"use client";

import { DrawerTeacher } from "@/components/layouts/dashboard/drawer";
import UserDropdown from "@/components/shared/user-dropdown";
import { selectUser } from "@/features/auth/auth-slice";
import { ITeacher } from "@/interfaces/teacher";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

type LayoutProps = { children: React.ReactNode };

const TeacherLayout: React.FC<LayoutProps> = ({ children }) => {
    const user = useAppSelector(selectUser);
    return (
        <div className="pt-24 pb-20">
            <div className="navbar">
                <span className="text-2xl font-bold">درس</span>
                <div className="flex items-center gap-x-4 !me-0">
                    <UserDropdown user={user as ITeacher} />
                    <DrawerTeacher />
                </div>
            </div>
            {children}
        </div>
    );
};

export default TeacherLayout;
