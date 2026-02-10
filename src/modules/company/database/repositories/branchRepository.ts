import { inject } from "inversify";
import { DeleteResult, Kysely, Transaction } from "kysely";
import { Database } from "../../../../config/database/database.types";
import { TYPES } from "../../../../config/di/types";
import { IBranchRepository } from "./interfaces";
import { Branch, BranchUpdate, NewBranch } from "../schema/branch";
import { injectable } from "inversify";

@injectable()
export class BranchRepository implements IBranchRepository {
    constructor(
        @inject(TYPES.Database) private readonly db: Kysely<Database>
    ) { }


    async findById(id: string, trx?: Transaction<Database>): Promise<Branch | undefined> {
        const db = trx ?? this.db;
        return db
            .selectFrom("branch")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    }

    async findByCompanyId(companyId: string, trx?: Transaction<Database>): Promise<Branch[]> {
        const db = trx ?? this.db;
        return db
            .selectFrom("branch")
            .selectAll()
            .where("company_id", "=", companyId)
            .execute();
    }

    async reparentBranches(targetCompanyId: string, duplicateCompanyId: string, trx?: Transaction<Database>): Promise<void> {
        const db = trx ?? this.db;
        await db
            .updateTable("branch")
            .set({ company_id: targetCompanyId })
            .where("company_id", "=", duplicateCompanyId)
            .execute();
    }

    async create(data: NewBranch, trx?: Transaction<Database>): Promise<Branch> {
        const db = trx ?? this.db;
        const result = await db
            .insertInto("branch")
            .values(data)
            .returningAll()
            .executeTakeFirstOrThrow();
        return result;
    }

    async update(id: string, data: BranchUpdate, trx?: Transaction<Database>): Promise<Branch[] | undefined> {
        const db = trx ?? this.db;
        return db
            .updateTable("branch")
            .set(data)
            .where("id", "=", id)
            .returningAll()
            .execute();
    }

    async delete(id: string, trx?: Transaction<Database>): Promise<DeleteResult> {
        const db = trx ?? this.db;
        return db
            .deleteFrom("branch")
            .where("id", "=", id)
            .executeTakeFirst();
    }
}
