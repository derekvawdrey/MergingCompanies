import { Company, CompanyUpdate, CompanyUpdateWithId } from "../database/schema/company";



export interface ICompanyService {

    /**
     * Returns true if all company IDs in the input array exist in the database, false otherwise.
     * @param ids 
     */
    doCompaniesExist(ids: string[]): Promise<boolean>

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

export interface IMergeService {
    /**
     * Merges the duplicate company into the target: reparents users and branches, then deletes the duplicate.
     * All steps run in a single transaction.
     */
    mergeCompanies(
        targetCompanyId: string,
        duplicateCompanyId: string,
        targetCompany: CompanyUpdate
    ): Promise<void>;
}