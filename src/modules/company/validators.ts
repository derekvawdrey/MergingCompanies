import { checkSchema, Schema } from "express-validator";
import { MergeCompleteCompanyUpdate } from "./types/merge.types";

/** Base validation for optional string fields (matches CompanyTable string columns). */
const optionalString: Schema[string] = {
    in: ["body"],
    optional: true,
    isString: true,
    trim: true,
};

/** Ensures schema has a validator for every MergeCompleteCompanyUpdate key. Errors if you add a Company field but forget the validator. */
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

export const mergeConflictsSchema: Schema = {};

export const mergeConflictsValidator = checkSchema(mergeConflictsSchema);
export const mergeCompleteValidator = checkSchema(mergeCompleteSchema);
