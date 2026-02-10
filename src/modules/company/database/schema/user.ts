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
export interface UserTable {
    id: Generated<string>;
    // Company ID will be a UUID instead of a integer.
    company_id: string;
    first_name: string;
    last_name: string;

}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>