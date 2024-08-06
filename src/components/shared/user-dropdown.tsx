"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { avatarPic } from "@/lib/utils";
import { IStudent } from "@/interfaces/student";
import { ITeacher } from "@/interfaces/teacher";
import { Home, User, LoaderCircle, LogOut } from "lucide-react";
import { IUser } from "@/interfaces/shared";
import { useDispatch } from "react-redux";
import { useLazyLogoutQuery } from "@/features/auth/auth-api";
import { Users } from "@/lib/enums";
import { Routes } from "@/lib/routes";
import { useToast } from "../ui/use-toast";
import { logoutAction } from "@/features/auth/auth-slice";
import Link from "next/link";

type Props = {
    user: IUser;
};

const UserDropdown: React.FC<Props> = ({ user }) => {
    const dispatch = useDispatch();
    const [logout, { isFetching }] = useLazyLogoutQuery();
    const homeRoute = user?.role == Users.STUDENT ? Routes.student.dashboard : Routes.teacher.home;
    const { toast } = useToast();

    const onLogut = async () => {
        try {
            const response = await logout().unwrap();
            toast({ description: "تم تسجيل الخروج بنجاح", className: "py-4" });
            console.log(response);
            dispatch(logoutAction());
        } catch (error) {
            console.log("Logut error", error);
            toast({ description: "حدثت مشكلة ما", variant: "destructive", className: "py-4" });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus-within:outline-none">
                <Avatar className="border hover:shadow backdrop-blur bg-white/10">
                    <AvatarImage src={user?.picture || avatarPic(user?.gender)} alt={user?.firstname} />
                    <AvatarFallback>{user?.firstname.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <b className="block">
                        {user?.firstname} {(user as IStudent)?.fathername || (user as ITeacher)?.lastname}
                    </b>
                    <small className="text-gray-500 block">{user?.email}</small>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href={homeRoute}>
                        <Home className="w-4 h-4 me-2" />
                        <span>الصفحة الرئيسية</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <User className="w-4 h-4 me-2" />
                    <span>الحساب الشخصي</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={onLogut} disabled={isFetching}>
                    {isFetching ? (
                        <LoaderCircle className="w-4 h-4 me-2" />
                    ) : (
                        <>
                            <LogOut className="w-4 h-4 me-2" />
                            <span>تسجيل الخروج</span>
                        </>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
