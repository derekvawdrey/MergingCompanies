import { Request, Response, NextFunction } from 'express';

export interface ICompanyController {
    getCompany: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCompanies: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IMergeController {
    mergeConflicts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    mergeComplete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}