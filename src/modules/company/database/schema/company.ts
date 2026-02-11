import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

/**
 * 
 */
export interface CompanyTable {
    id: Generated<string>;
    name: string;

    // I decided not to make the address a completely new table and have it attached to a company.
    // It would make sense to have multiple addresses for a company, but I think it would be overkill for this project.
    address_line_1: string;
    address_line_2: string;
    state: string;
    city: string;

    // This should also work with postal codes like: "12345-6789" so I didn't choose a number.
    postal_code: string;
}

export type Company = Selectable<CompanyTable>
export type NewCompany = Insertable<CompanyTable>
export type CompanyUpdate = Updateable<CompanyTable>
export type CompanyUpdateWithId = CompanyUpdate & { id: string }