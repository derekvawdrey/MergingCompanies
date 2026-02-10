import { IBranchRepository, ICompanyRepository, IUserRepository } from "../../modules/company/database/repositories/interfaces";

export interface Database {
    user: IUserRepository
    company: ICompanyRepository
    branch: IBranchRepository
}