import { Kysely } from "kysely";
import { Database } from "../../../../config/database/database.types";
import { IUserRepository } from "./interfaces";
import { User, UserUpdate, NewUser } from "../schema/user";

export class UserRepository implements IUserRepository {
    constructor(private readonly db: Kysely<Database>) {}

    async findById(id: string): Promise<User | undefined> {
        return this.db
            .selectFrom("user")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    }

    async findByCompanyId(companyId: string): Promise<User[]> {
        return this.db
            .selectFrom("user")
            .selectAll()
            .where("company_id", "=", companyId)
            .execute();
    }

    async create(data: NewUser): Promise<User> {
        const result = await this.db
            .insertInto("user")
            .values(data)
            .returningAll()
            .executeTakeFirstOrThrow();
        return result;
    }

    async update(id: string, data: UserUpdate): Promise<User | undefined> {
        return this.db
            .updateTable("user")
            .set(data)
            .where("id", "=", id)
            .returningAll()
            .executeTakeFirst();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.db
            .deleteFrom("user")
            .where("id", "=", id)
            .executeTakeFirst();
        return Number(result.numDeletedRows ?? 0) > 0;
    }
}
