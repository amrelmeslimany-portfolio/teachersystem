import { RequestHandler } from "express";

export interface IController {
    get?: RequestHandler;
    getDetails?: RequestHandler;
    create?: RequestHandler;
    update?: RequestHandler;
    delete?: RequestHandler;
}
