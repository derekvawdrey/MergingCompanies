import { Company, CompanyUpdate, NewCompany } from "../schema/company";
import { User, UserUpdate, NewUser } from "../schema/user";
import { Branch, BranchUpdate, NewBranch } from "../schema/branch";
import { DeleteResult, Transaction } from "kysely";
import { Database } from "../../../../config/database/database.types";

export interface ICompanyRepository {
    findById(id: string, trx?: Transaction<Database>): Promise<Company | undefined>;
    findByIds(ids: string[], trx?: Transaction<Database>): Promise<Company[]>;
    findAll(trx?: Transaction<Database>): Promise<Company[]>;
    search(searchQuery: string, trx?: Transaction<Database>): Promise<Company[]>;
    create(data: NewCompany, trx?: Transaction<Database>): Promise<Company>;
    update(id: string, data: CompanyUpdate, trx?: Transaction<Database>): Promise<Company | undefined>;
    delete(id: string, trx?: Transaction<Database>): Promise<DeleteResult>;
}

export interface IUserRepository {
    findById(id: string, trx?: Transaction<Database>): Promise<User | undefined>;
    findByCompanyId(companyId: string, trx?: Transaction<Database>): Promise<User[]>;
    reparentUsers(targetCompanyId: string, duplicateCompanyId: string, trx?: Transaction<Database>): Promise<void>;
    create(data: NewUser, trx?: Transaction<Database>): Promise<User>;
    update(id: string, data: UserUpdate, trx?: Transaction<Database>): Promise<User | undefined>;
    delete(id: string, trx?: Transaction<Database>): Promise<DeleteResult>;
}

export interface IBranchRepository {
    findById(id: string, trx?: Transaction<Database>): Promise<Branch | undefined>;
    findByCompanyId(companyId: string, trx?: Transaction<Database>): Promise<Branch[]>;
    reparentBranches(targetCompanyId: string, duplicateCompanyId: string, trx?: Transaction<Database>): Promise<void>;
    create(data: NewBranch, trx?: Transaction<Database>): Promise<Branch>;
    update(id: string, data: BranchUpdate, trx?: Transaction<Database>): Promise<Branch | undefined>;
    delete(id: string, trx?: Transaction<Database>): Promise<DeleteResult>;
}