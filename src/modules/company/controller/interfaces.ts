import { Request, Response, NextFunction } from 'express';

export interface ICompanyController {
    getCompany: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCompanies: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    searchCompany: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IMergeController {
    previewMerge: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    completeMerge: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}