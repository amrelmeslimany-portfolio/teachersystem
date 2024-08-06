import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IGetTerm } from "@/interfaces/term";
import { Routes } from "@/lib/routes";
import { AppColors } from "@/lib/theme";
import { cn, statusToAr } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import TermActions from "./term-actions";
import { Status } from "@/lib/enums";
import LinkActionsFooter from "@/components/ui/link-actions-footer";

const TermItem: React.FC<IGetTerm> = ({ _count, id, level, status, title }) => {
    return (
        <Card className=" bg-primary/10 backdrop-blur">
            <Link href={`${Routes.teacher.terms.home}/${id}`} className="hover:bg-primary/10 block">
                <CardHeader className="py-2 border-b">
                    <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
                    <CardDescription className={cn([AppColors.status[status]])}>{statusToAr(status)}</CardDescription>
                </CardHeader>
            </Link>
            <CardContent className="py-4">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col text-center p-2 rounded border">
                        <span className="block  text-xl font-medium">{_count.units}</span>
                        <p className="text-sm text-gray-500">الوحدات</p>
                    </div>
                    <div className="flex flex-col text-center p-2 rounded border">
                        <span className="block  text-xl font-medium">{_count.note}</span>
                        <p className="text-sm text-gray-500">الملاحظات</p>
                    </div>
                </div>
            </CardContent>
            <LinkActionsFooter
                label="المرحلة"
                href={`${Routes.teacher.levels.home}/${level.id}`}
                title={level.title}
                actions={<TermActions title={title} id={id} />}
            />
        </Card>
    );
};

export default TermItem;
