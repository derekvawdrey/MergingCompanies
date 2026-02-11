import { inject, injectable } from "inversify";
import { ICompanyService } from "./interfaces";
import { ICompanyRepository } from "../database/repositories/interfaces";
import { TYPES } from "../../../config/di/types";
import { Company, CompanyUpdateWithId } from "../database/schema/company";

@injectable()
export class CompanyService implements ICompanyService {
    constructor(
        @inject(TYPES.ICompanyRepository) private companyRepository: ICompanyRepository,
    ) {}

    async doCompaniesExist(ids: string[]): Promise<boolean> {
        const companies = await this.companyRepository.findByIds(ids);
        return companies.length === ids.length;
    }

    async getCompaniesByIds(ids: string[]): Promise<Company[]> {
        return await this.companyRepository.findByIds(ids);
    }

    async getCompanyById(id: string): Promise<Company | null> {
        return await this.companyRepository.findById(id) ?? null;
    }

    async searchCompany(searchQuery: string): Promise<Company[]> {
        return await this.companyRepository.search(searchQuery);
    }

    async getAllCompanies(): Promise<Company[]> {
        return await this.companyRepository.findAll();
    }

    async updateCompany(
        data: CompanyUpdateWithId
    ): Promise<Company | null> {
        return await this.companyRepository.update(data.id, data) ?? null;
    }

    async deleteCompany(id: string): Promise<void> {
        await this.companyRepository.delete(id);
    }
}