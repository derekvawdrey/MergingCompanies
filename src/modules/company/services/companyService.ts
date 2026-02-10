import { inject, injectable } from "inversify";
import { ICompanyService } from "./interfaces";
import { IBranchRepository, ICompanyRepository, IUserRepository } from "../database/repositories/interfaces";
import { TYPES } from "../../../config/di/types";
import { Company, CompanyUpdateWithId } from "../database/schema/company";
import { Database } from "../../../config/database/database.types";
import { Kysely, Transaction } from "kysely";

@injectable()
export class CompanyService implements ICompanyService {
    constructor(
        @inject(TYPES.ICompanyRepository) private companyRepository: ICompanyRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.IBranchRepository) private branchRepository: IBranchRepository,
        @inject(TYPES.Database) private db: Kysely<Database>
    ) {

    }

    async doCompaniesExist(ids: string[]): Promise<boolean> {
        const companies = await this.companyRepository.findByIds(ids);
        return companies.length === ids.length;
    }

    async getCompanyById(id: string): Promise<Company | null> {
        return await this.companyRepository.findById(id) ?? null;
    }

    async getAllCompanies(): Promise<Company[]> {
        return await this.companyRepository.findAll();
    }

    async updateCompany(
        data: CompanyUpdateWithId
    ): Promise<Company | null> {
        return null;
    }

    async deleteCompany(id: string): Promise<void> {
        await this.companyRepository.delete(id);
    }
}