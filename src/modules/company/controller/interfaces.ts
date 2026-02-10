import { Request, Response, NextFunction } from 'express';

export interface ICompanyController {
    getCompany: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCompanies: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}