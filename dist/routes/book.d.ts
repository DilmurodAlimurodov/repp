/// <reference types="qs" />
/// <reference types="express" />
declare const _default: {
    path: string;
    defaultMethod: string;
    routes: {
        path: string;
        method: string;
        controllers: ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>) => Promise<void>)[];
    }[];
};
export default _default;
