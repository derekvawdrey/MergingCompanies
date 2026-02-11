import { CompanyUpdate } from "../database/schema/company";

export type MergeCompleteCompanyUpdate = Omit<CompanyUpdate, "id">;

export interface MergeConflict {
    field: string;
    valueType: "string" | "number" | "boolean" | "object" | "array" | "null";
    targetValue: string | null;
    duplicateValue: string | null;
}

export interface MergeConflicts {
    conflicts: MergeConflict[];
}