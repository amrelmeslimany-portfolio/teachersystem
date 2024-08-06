import { IUser } from "./shared";

export interface ITeacher extends IUser {
    lastname: string;
    birthdate: any;
    email: string;
    school: string;
    phonenumber: string;
    location: string;
}
