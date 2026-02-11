import { checkSchema, Schema } from "express-validator";
import { MergeCompleteCompanyUpdate } from "./types/merge.types";

/** Base validation for optional string fields (matches CompanyTable string columns). */
const optionalString: Schema[string] = {
    in: ["body"],
    optional: true,
    isString: true,
    trim: true,
};

/** Base validation for required UUID params. */
const requiredUuidParam: Schema[string] = {
    in: ["params"],
    notEmpty: {
        errorMessage: "Required",
    },
    isUUID: {
        errorMessage: "Must be a valid UUID",
    },
};

/** 
 * Ensures schema has a validator for every MergeCompleteCompanyUpdate key. 
 * Errors if you add a Company field but forget the validator. 
 * */
function buildMergeCompleteSchema<T extends Record<keyof MergeCompleteCompanyUpdate, Schema[string]>>(
    schema: T
): T {
    return schema;
}

export const mergeCompleteSchema = buildMergeCompleteSchema({
    name: optionalString,
    address_line_1: optionalString,
    address_line_2: optionalString,
    state: optionalString,
    city: optionalString,
    postal_code: optionalString,
});

export const mergeParamSchema: Schema = {
    targetId: requiredUuidParam,
    duplicateId: requiredUuidParam,
};

export const companyIdParamSchema: Schema = {
    companyId: requiredUuidParam,
};

export const companyIdValidator = checkSchema(companyIdParamSchema);
export const mergeParamValidator = checkSchema(mergeParamSchema);
export const mergeCompleteValidator = checkSchema(mergeCompleteSchema);
