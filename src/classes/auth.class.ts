import { NextFunction } from "express";
import { ValidationException } from "../utils/exceptions";
import { compare } from "bcrypt";

export type LoginBodyType = {
    email: string;
    password: string;
};

export default class AuthClass {}
