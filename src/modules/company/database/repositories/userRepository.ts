import { DeleteResult, Kysely, Transaction } from "kysely";
import { Database } from "../../../../config/database/database.types";
import { IUserRepository } from "./interfaces";
import { User, UserUpdate, NewUser } from "../schema/user";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly db: Kysely<Database>) { }

    async findById(id: string, trx?: Transaction<Database>): Promise<User | undefined> {
        const db = trx ?? this.db;
        return db
            .selectFrom("user")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
    }

    async findByCompanyId(companyId: string, trx?: Transaction<Database>): Promise<User[]> {
        const db = trx ?? this.db;
        return db
            .selectFrom("user")
            .selectAll()
            .where("company_id", "=", companyId)
            .execute();
    }

    async reparentUsers(targetCompanyId: string, duplicateCompanyId: string, trx?: Transaction<Database>): Promise<void> {
        const db = trx ?? this.db;
        await db
            .updateTable("user")
            .set({ company_id: targetCompanyId })
            .where("company_id", "=", duplicateCompanyId)
            .execute();
    }

    async create(data: NewUser, trx?: Transaction<Database>): Promise<User> {
        const db = trx ?? this.db;
        const result = await db
            .insertInto("user")
            .values(data)
            .returningAll()
            .executeTakeFirstOrThrow();
        return result;
    }

    async update(id: string, data: UserUpdate, trx?: Transaction<Database>): Promise<User[] | undefined> {
        const db = trx ?? this.db;
        return db
            .updateTable("user")
            .set(data)
            .where("id", "=", id)
            .returningAll()
            .execute();
    }

    async delete(id: string, trx?: Transaction<Database>): Promise<DeleteResult> {
        const db = trx ?? this.db;
        return db
            .deleteFrom("user")
            .where("id", "=", id)
            .executeTakeFirst();
    }
}
