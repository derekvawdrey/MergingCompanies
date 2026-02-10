import { Request, Response, NextFunction } from 'express';
import { injectable } from "inversify";

@injectable()
export abstract class BaseController {
    protected handleAsync(fn: (req: Request, res: Response) => Promise<any>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await fn(req, res);
            } catch (error) {
                next(error);
            }
        };
    }
}