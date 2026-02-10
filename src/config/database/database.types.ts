import {
    CompanyTable,
} from "../../modules/company/database/schema/company";
import {
    UserTable,
} from "../../modules/company/database/schema/user";
import {
    BranchTable,
} from "../../modules/company/database/schema/branch";

export interface Database {
    company: CompanyTable;
    user: UserTable;
    branch: BranchTable;
}
