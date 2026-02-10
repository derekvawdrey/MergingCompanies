import { inject } from "inversify";
import { DeleteResult, Kysely, Transaction } from "kysely";
import { Database } from "../../../../config/database/database.types";
import { TYPES } from "../../../../config/di/types";
import { ICompanyRepository } from "./interfaces";
import { Company, CompanyUpdate, NewCompany } from "../schema/company";
import { injectable } from "inversify";

@injectable()
export class CompanyRepository implements ICompanyRepository {
    constructor(@inject(TYPES.Database) private readonly db: Kysely<Database>) {}

    async findById(id: string, trx?: Transaction<Database>): Promise<Company | undefined> {
        const db = trx ?? this.db;
        return db
            .selectFrom("company")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    }

    async findByIds(ids: string[], trx?: Transaction<Database>): Promise<Company[]> {
        const db = trx ?? this.db;
        return db
            .selectFrom("company")
            .selectAll()
            .where("id", "in", ids)
            .execute();
    }

    async findAll(trx?: Transaction<Database>): Promise<Company[]> {
        const db = trx ?? this.db;
        return db.selectFrom("company").selectAll().execute();
    }

    async create(data: NewCompany, trx?: Transaction<Database>): Promise<Company> {
        const db = trx ?? this.db;
        const result = await db
            .insertInto("company")
            .values(data)
            .returningAll()
            .executeTakeFirstOrThrow();
        return result;
    }

    async update(id: string, data: CompanyUpdate, trx?: Transaction<Database>): Promise<Company | undefined> {
        const db = trx ?? this.db;
        return db
            .updateTable("company")
            .set(data)
            .where("id", "=", id)
            .returningAll()
            .executeTakeFirstOrThrow();
    }

    async delete(id: string, trx?: Transaction<Database>): Promise<DeleteResult> {
        const db = trx ?? this.db;
        return db
            .deleteFrom("company")
            .where("id", "=", id)
            .executeTakeFirst();
    }
}
