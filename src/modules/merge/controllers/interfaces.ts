import { Request, Response, NextFunction } from 'express';

export interface IMergeController {
    mergeConflicts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    mergeComplete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}