import { Company, CompanyUpdateWithId } from "../database/schema/company";



export interface ICompanyService {
    /**
     * Get a company by its ID.
     * @param id 
     * @returns Company object if found, otherwise null
     */
    getCompanyById: (id: string) => Promise<Company | null>;

    /**
     * Retrieve all companies.
     * Pagination and filtering aren't added here for simplicity, but could be added in a real implementation.
     * @returns Company array of all companies in the database
     */
    getAllCompanies: () => Promise<Company[]>;

    /**
     * Reparents users and branches from the duplicate company to the target company.
     * @param targetCompanyId UUID of the target company
     * @param duplicateCompanyId UUID of the duplicate company whose users and branches will be reparented to the target company
     * @returns 
     */
    reparentChildren: (targetCompanyId: string, duplicateCompanyId: string) => Promise<void>;

    /**
     * Updates a company by its ID with the provided data.
     * @param data Data to update the company with, must include the company ID to update
     * @returns Company object if update was successful, otherwise null
     */
    updateCompany: (data: CompanyUpdateWithId) => Promise<Company | null>;

    /**
     * Delete a company by its ID.
     * @param id Id of company to delete
     * @returns 
     */
    deleteCompany: (id: string) => Promise<void>;
}