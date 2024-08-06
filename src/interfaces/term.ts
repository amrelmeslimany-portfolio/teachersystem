import { IGet, IId } from "./shared";
import { Status } from "@/lib/enums";

export interface IGetTerm extends IId {
    status: Status;
    title: string;
    level: IGet;
    _count: { note: number; units: number };
}

export interface IGetTermDetails extends IGetTerm {
    description: string;
    endDate: Date;
    examReminingDate: number;
    finalExamDate: Date;
    level: IGet;
    note: any[]; // FIXME
    startDate: Date;
    units: any[];
}

// Without relation fields data
export type TermOnlyType = Omit<IGetTermDetails, "note" | "units" | "_count">;
