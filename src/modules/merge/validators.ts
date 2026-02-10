import { checkSchema, Schema } from "express-validator";
import { CompanyUpdate } from "../company/database/schema/company";

/** Company update fields allowed in merge complete (no id). */
export type MergeCompleteCompanyUpdate = Omit<CompanyUpdate, "id">;


export const mergeConflictsSchema: Schema = {

};

export const mergeCompleteSchema: Schema = {
    
    // TODO: ADD THE COMPANY INFORMATION HERE

};

export const mergeConflictsValidator = checkSchema(mergeConflictsSchema);
export const mergeCompleteValidator = checkSchema(mergeCompleteSchema);
