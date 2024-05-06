import { EnvironmentEnum } from "./enums";

export const isProduction: boolean = process.env.NODE_ENV === EnvironmentEnum.Production;
