import { QuizStatus } from "./quizzes";
import { IGet, IGetCover } from "./shared";
import { StudentGetType } from "./student";

export interface IGetLevel extends IGetCover {
    description: string;
    _count: { groups: number; students: number; units: number };
}

export type LevelOnlyType = Omit<IGetLevel, "_count">;

type QuizType = IGet & { status: QuizStatus };

export interface IGetLevelDetails extends IGetCover {
    description: string;
    groups: IGetCover[];
    note: IGet[];
    quizes: QuizType[];
    students: StudentGetType[];
    terms: IGet[];
    units: any[];
    _count: { groups: number; note: number; quizes: number; students: number; units: number };
}
