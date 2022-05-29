import { Response } from "express";
export declare const serverError: (err: any, res: Response) => void;
export declare const alreadyExist: (msg: string, res: Response) => void;
export declare const notFound: (msg: string, res: Response) => void;
