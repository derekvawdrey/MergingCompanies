import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'
/**
 * User table represents a user of the system.
 * These are people who have logged in through the FamilySearch API.
 */
export interface BranchTable {
    id: Generated<string>;
    company_id: string;
    name: string;
    // Wouldn't it make more sense to attach the address to the branch instead of the company? 
}

export type Branch = Selectable<BranchTable>
export type NewBranch = Insertable<BranchTable>
export type BranchUpdate = Updateable<BranchTable>