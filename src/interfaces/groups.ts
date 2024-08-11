import { IGet, IGetCover } from "./shared";
import { StudentGetType } from "./student";
import { IGetWeekdays } from "./weekdays";

export interface IGetGroup extends IGetCover {
    appointTime: Date;
    level: IGet;
    _count: { students: number };
}

export interface IGetGroupOnly extends IGetGroup {
    description: string;
    weekdays: IGet;
    duration: string;
}

export interface IGroupDetails extends Omit<IGetGroupOnly, "weekdays"> {
    students: StudentGetType[];
    weekdays: IGetWeekdays;
    updatedAt: Date;
    createdAt: Date;
}
