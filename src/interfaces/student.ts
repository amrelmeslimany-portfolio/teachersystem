import { Users } from "@/lib/enums";
import { IGet, IUser } from "./shared";
import { INextQuiz } from "./quizzes";

export interface IStudent extends IUser {
    fathername: string;
    isEmailVerified: boolean;
    level: IGet;
    role: Users;
}

export type StudentGetType = Pick<IStudent, "firstname" | "fathername" | "picture" | "id">;

export interface IStates {
    units: number;
    lessons: number;
    lessonsView: number;
    lessonLikes: number;
    quizes: number;
    takenQuizes: number;
    leftQuizes: number;
    quizAVGMarks: number;
    nextQuiz: INextQuiz[];
    notes: number;
    notesView: number;
}
