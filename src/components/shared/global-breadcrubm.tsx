import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Users } from "@/lib/enums";
import { Routes } from "@/lib/routes";
import { ChevronLeft } from "lucide-react";
import { Fragment } from "react";

export type BreadcrumbItemProp = { href: string; title: string };

export type GlobalBreadcrumbProps = {
    type: Users;
    items?: BreadcrumbItemProp[];
    current: string;
    isCollapse?: boolean;
};

export function GlobalBreadcrumb({ items, type, isCollapse, current }: GlobalBreadcrumbProps) {
    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={type === Users.TEACHER ? Routes.teacher.home : "/"}>الرئيسية</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <ChevronLeft />
                </BreadcrumbSeparator>
                {isCollapse && (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronLeft />
                        </BreadcrumbSeparator>
                    </>
                )}
                {items &&
                    items.map((item) => (
                        <Fragment key={item.title}>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={item.href}>{item.title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <ChevronLeft />
                            </BreadcrumbSeparator>
                        </Fragment>
                    ))}
                <BreadcrumbItem>
                    <BreadcrumbPage>{current}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
