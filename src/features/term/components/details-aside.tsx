import ListItemIcon from "@/components/ui/list-item-icon";
import { IGet } from "@/interfaces/shared";
import { Routes } from "@/lib/routes";
import { AppColors } from "@/lib/theme";
import { statusToAr } from "@/lib/utils";
import { Flame, SquareStack } from "lucide-react";
import React from "react";

type Props = {
    level: IGet;
    status: string;
    notesCount: number;
    unitsCount: number;
};

const DetailsAside: React.FC<Props> = ({ level, status, notesCount, unitsCount }) => {
    return (
        <aside className="md:w-72 flex-shrink-0 ">
            <h4 className="text-gray-500 mb-4">معلومات</h4>

            <ListItemIcon
                href={Routes.teacher.levels.home + "/" + level.id}
                Icon={SquareStack}
                label="المرحله"
                value={level.title}
                wrapperClassname="mb-4"
            />

            <ListItemIcon
                Icon={Flame}
                label="الحالة"
                value={statusToAr(status)}
                valueClassname={AppColors.status[status]}
            />

            <div className="flex  items-center gap-4 mt-4">
                <ListItemIcon label="الملاحظات" value={notesCount.toString()} wrapperClassname="mb-4 flex-1" />
                <ListItemIcon label="الوحدات" value={unitsCount.toString()} wrapperClassname="mb-4 flex-1" />
            </div>
        </aside>
    );
};

export default DetailsAside;
