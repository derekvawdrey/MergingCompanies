import { Kysely } from "kysely";
import { Database } from "../../../../config/database/database.types";
import { IBranchRepository } from "./interfaces";
import { Branch, BranchUpdate, NewBranch } from "../schema/branch";
import { injectable } from "inversify";

@injectable()
export class BranchRepository implements IBranchRepository {
    constructor(private readonly db: Kysely<Database>) {}

    async findById(id: string): Promise<Branch | undefined> {
        const result = this.db
            .selectFrom("branch")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();

        return await result;
    }

    async findByCompanyId(companyId: string): Promise<Branch[]> {
        return this.db
            .selectFrom("branch")
            .selectAll()
            .where("company_id", "=", companyId)
            .execute();
    }

    async create(data: NewBranch): Promise<Branch> {
        const result = await this.db
            .insertInto("branch")
            .values(data)
            .returningAll()
            .executeTakeFirstOrThrow();
        return result;
    }

    async update(id: string, data: BranchUpdate): Promise<Branch[] | undefined> {
        return this.db
            .updateTable("branch")
            .set(data)
            .where("id", "=", id)
            .returningAll()
            .execute();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.db
            .deleteFrom("branch")
            .where("id", "=", id)
            .executeTakeFirst();
        return Number(result.numDeletedRows ?? 0) > 0;
    }
}
