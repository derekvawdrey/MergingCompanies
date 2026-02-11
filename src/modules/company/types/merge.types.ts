import { CompanyUpdate } from "../database/schema/company";

export type MergeCompleteCompanyUpdate = Omit<CompanyUpdate, "id">;
