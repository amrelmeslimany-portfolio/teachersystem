import { Student, Teacher } from "@prisma/client";

type ExcludeUserKeys = "password" | "email" | "id";

type ExcludeStudentKeys = "group" | "groupId" | "level" | "levelId" | "createdAt" | "isEmailVerified";

export type IEditProfile = Partial<Omit<Student, ExcludeUserKeys | ExcludeStudentKeys>> &
    Partial<Omit<Teacher, ExcludeUserKeys>> & { fatherPhonenumber?: string };
