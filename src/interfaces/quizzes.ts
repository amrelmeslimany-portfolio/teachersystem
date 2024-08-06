import { IGetCover } from "./shared";

export enum QuizStatus {
    Pending = "مُعلق",
    InProgress = "متاح الان",
    Finished = "انتهي",
}

export interface INextQuiz extends IGetCover {
    endDate: Date;
}
