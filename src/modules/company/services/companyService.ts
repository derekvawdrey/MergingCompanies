import { inject, injectable } from "inversify";
import { ICompanyService } from "./interfaces";
import { IBranchRepository, ICompanyRepository, IUserRepository } from "../database/repositories/interfaces";
import { TYPES } from "../../../config/di/types";
import { Company, CompanyUpdateWithId } from "../database/schema/company";

@injectable()
export class CompanyService implements ICompanyService {
    constructor(
        @inject(TYPES.ICompanyRepository) private companyRepository: ICompanyRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.IBranchRepository) private branchRepository: IBranchRepository
    ) {

    }
    async getCompanyById(id: string): Promise<Company | null> {
        return await this.companyRepository.findById(id) ?? null;
    }

    async getAllCompanies(): Promise<Company[]> {
        return await this.companyRepository.findAll();
    }

    async reparentChildren(
        targetCompanyId: string,
        duplicateCompanyId: string
    ): Promise<void> {
        const companies = await this.companyRepository.findByIds([
            targetCompanyId,
            duplicateCompanyId,
        ]);

        if (companies.length !== 2) {
            throw new Error('One or both companies do not exist');
        }

        await this.userRepository.reparentUsers(targetCompanyId, duplicateCompanyId);
        await this.branchRepository.reparentBranches(targetCompanyId, duplicateCompanyId);
    }

    async updateCompany(
        data: CompanyUpdateWithId
    ): Promise<Company | null> {
        return null;
    }

    async deleteCompany(id: string): Promise<void> {

    }
}