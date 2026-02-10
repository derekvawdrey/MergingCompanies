import { checkSchema, Schema } from "express-validator";
import { CompanyUpdate } from "../company/database/schema/company";

/** Company update fields allowed in merge complete (no id). */
export type MergeCompleteCompanyUpdate = Omit<CompanyUpdate, "id">;

const stringRequired = {
    isString: true,
    notEmpty: { errorMessage: "must not be empty" },
    trim: true,
};

export const mergeConflictsSchema: Schema = {
    sourceId: {
        in: ["query"],
        ...stringRequired,
        errorMessage: "sourceId must be a non-empty string",
    },
    targetId: {
        in: ["query"],
        ...stringRequired,
        errorMessage: "targetId must be a non-empty string",
    },
};

export const mergeCompleteSchema: Schema = {
    sourceId: {
        in: ["body"],
        ...stringRequired,
        errorMessage: "sourceId must be a non-empty string",
    },
    targetId: {
        in: ["body"],
        ...stringRequired,
        errorMessage: "targetId must be a non-empty string",
    },
    
    // TODO: ADD THE COMPANY INFORMATION HERE

};

export const mergeConflictsValidator = checkSchema(mergeConflictsSchema);
export const mergeCompleteValidator = checkSchema(mergeCompleteSchema);
