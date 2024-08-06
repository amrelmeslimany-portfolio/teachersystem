"use client";

import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { selectUser } from "../auth-slice";
import { Users } from "@/lib/enums";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import { IStudent } from "@/interfaces/student";

type Props = { role: Users; children: React.ReactNode };

const ProtectWrapper = ({ role, children }: Props) => {
    const user = useAppSelector(selectUser);
    const router = useRouter();
    const pathname = usePathname();

    React.useLayoutEffect(() => {
        if (!user) {
            if (pathname.startsWith(Routes.teacher.home)) {
                router.replace(Routes.teacher.auth.login);
            } else {
                router.replace(Routes.student.auth.login);
            }
        } else if (user.role !== role) {
            if (user.role === Users.TEACHER) {
                router.replace(Routes.teacher.home);
            } else {
                // check email verified or not
                if (!(user as IStudent).isEmailVerified) {
                    router.push(Routes.student.auth.emailVerfication);
                } else {
                    router.replace(Routes.student.dashboard);
                }
            }
        }
    }, [user, role, router, pathname]);

    return children;
};

export default ProtectWrapper;

// const protectRoute = (Component: ComponentType<any>, role: Users) => {
//     const IsAuth = (props: any) => {
//         const user = useAppSelector(selectUser);
//         const router = useRouter();
//         const pathname = usePathname();

//         React.useLayoutEffect(() => {
//             if (!user) {
//                 if (pathname.startsWith(Routes.teacher.home)) {
//                     router.replace(Routes.teacher.auth.login);
//                 } else {
//                     router.replace(Routes.student.auth.login);
//                 }
//             } else if (user.role !== role) {
//                 if (user.role === Users.TEACHER) {
//                     router.replace(Routes.teacher.home);
//                 } else {
//                     router.replace(Routes.student.dashboard);
//                 }
//             }
//         }, [user, role, router, pathname]);

//         if (!user || user.role !== role) {
//             return null;
//         }

//         return <Component {...props} />;
//     };

//     return IsAuth;
// };

// export default protectRoute;
