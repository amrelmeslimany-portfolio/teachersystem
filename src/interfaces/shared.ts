import { Gender, Users } from "@/lib/enums";

export interface IId {
    id: string;
}

export interface IGet extends IId {
    title: string;
}

export interface IGetCover extends IGet {
    cover: string | null;
}

export interface IUser extends IId {
    firstname: string;
    email: string;
    gender: Gender;
    picture: string | null;
    role: Users;
    age: number | null;
}

export interface IMetadata {
    hasNext: boolean;
    hasPrevious: boolean;
    limit: number;
    page: number;
    skip: number;
    total: number;
}

// NOTE DT is shorten for Data Type
export interface IOkResponse<DT> {
    metadata: IMetadata;
    data: DT;
}

export interface IError {
    data: { message: string };
    status: number;
}
