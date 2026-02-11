import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'


/**
 * User Table represents people associated with a specific company
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