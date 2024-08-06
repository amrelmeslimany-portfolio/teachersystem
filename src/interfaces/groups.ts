import { IGet, IGetCover } from "./shared";

export interface IGetGroup extends IGetCover {
    appointTime: Date;
    level: IGet;
    _count: { students: number };
}

// export interface IWeekdaysDetails extends IGetWeekdays {
//     groups: IGetCover[];
//     _count: { groups: number };
// }
