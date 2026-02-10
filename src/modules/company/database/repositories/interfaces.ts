import { Company, CompanyUpdate, NewCompany } from "../schema/company";
import { User, UserUpdate, NewUser } from "../schema/user";
import { Branch, BranchUpdate, NewBranch } from "../schema/branch";

export interface ICompanyRepository {
    findById(id: string): Promise<Company | undefined>;
    findByIds(ids: string[]): Promise<Company[]>;
    findAll(): Promise<Company[]>;
    create(data: NewCompany): Promise<Company>;
    update(id: string, data: CompanyUpdate): Promise<Company[] | undefined>;
    delete(id: string): Promise<boolean>;
}

export interface IUserRepository {
    findById(id: string): Promise<User | undefined>;
    findByCompanyId(companyId: string): Promise<User[]>;
    reparentUsers(targetCompanyId: string, duplicateCompanyId: string): Promise<void>;
    create(data: NewUser): Promise<User>;
    update(id: string, data: UserUpdate): Promise<User[] | undefined>;
    delete(id: string): Promise<boolean>;
}

export interface IBranchRepository {
    findById(id: string): Promise<Branch | undefined>;
    findByCompanyId(companyId: string): Promise<Branch[]>;
    reparentBranches(targetCompanyId: string, duplicateCompanyId: string): Promise<void>;
    create(data: NewBranch): Promise<Branch>;
    update(id: string, data: BranchUpdate): Promise<Branch[] | undefined>;
    delete(id: string): Promise<boolean>;
}