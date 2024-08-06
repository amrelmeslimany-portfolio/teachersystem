import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Gender, Status } from "./enums";
import MaleImg from "../../public/imgs/male-picture.webp";
import FemaleImg from "../../public/imgs/female-picture.webp";
import { ReadonlyURLSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const avatarPic = (gender?: Gender) => (gender == Gender.Male ? MaleImg.src : FemaleImg.src);

export const queryURL = (query: string, value?: string) => (value ? `${query}=${value}` : "");

export const statusToAr = (status: string) => (status == "Open" ? Status.Open : Status.Close);

export const updateQuery = (
    query: { key: string; value: any },
    checked: boolean,
    searchParams: ReadonlyURLSearchParams
): string => {
    const params = new URLSearchParams(searchParams);
    if (params.get(query.key)) params.delete(query.key);
    if (checked) params.append(query.key, query.value);
    else params.delete(query.key);
    return params.toString();
};
