import { Company, CompanyUpdateWithId } from "../database/schema/company";
import { MergeConflicts, MergeCompleteCompanyUpdate } from "../types/merge.types";



export interface ICompanyService {

    /**
     * Get a company by its ID.
     * @param id 
     * @returns Company object if found, otherwise null
     */
    getCompanyById: (id: string) => Promise<Company | null>;

    /**
     * Get multiple companies by their IDs.
     * @param ids 
     * @returns Company array of companies with the provided IDs that exist in the database
     */
    getCompaniesByIds: (ids: string[]) => Promise<Company[]>

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
     * Gets all conflicts that would arise from merging the duplicate company into the target company that need to be resolved.
     */
    getMergeConflicts(targetCompanyId: string, duplicateCompanyId: string): Promise<MergeConflicts>;


    /**
     * Merges the duplicate company into the target: reparents users and branches, then deletes the duplicate.
     * All steps run in a single transaction.
     */
    mergeCompanies(
        targetCompanyId: string,
        duplicateCompanyId: string,
        targetCompany: MergeCompleteCompanyUpdate
    ): Promise<void>;
}