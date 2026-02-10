import { Kysely } from "kysely";
import { Database } from "../../../../config/database/database.types";
import { ICompanyRepository } from "./interfaces";
import { Company, CompanyUpdate, NewCompany } from "../schema/company";

export class CompanyRepository implements ICompanyRepository {
    constructor(private readonly db: Kysely<Database>) {}

    async findById(id: string): Promise<Company | undefined> {
        return this.db
            .selectFrom("company")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    }

    async findAll(): Promise<Company[]> {
        return this.db.selectFrom("company").selectAll().execute();
    }

    async create(data: NewCompany): Promise<Company> {
        const result = await this.db
            .insertInto("company")
            .values(data)
            .returningAll()
            .executeTakeFirstOrThrow();
        return result;
    }

    async update(id: string, data: CompanyUpdate): Promise<Company | undefined> {
        return this.db
            .updateTable("company")
            .set(data)
            .where("id", "=", id)
            .returningAll()
            .executeTakeFirst();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.db
            .deleteFrom("company")
            .where("id", "=", id)
            .executeTakeFirst();
        return Number(result.numDeletedRows ?? 0) > 0;
    }
}
