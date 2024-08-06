import { IGetCover, IId } from "./shared";

export interface IGetWeekdays extends IId {
    FR: boolean | null;
    MO: boolean | null;
    SA: boolean | null;
    SU: boolean | null;
    TH: boolean | null;
    TU: boolean | null;
    WE: boolean | null;
}

export interface IWeekdaysDetails extends IGetWeekdays {
    groups: IGetCover[];
    _count: { groups: number };
}
