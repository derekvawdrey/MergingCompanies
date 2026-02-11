import { inject, injectable } from "inversify";
import { ICompanyService, IMergeService } from "./interfaces";
import { Kysely } from "kysely";
import { Database } from "../../../config/database/database.types";
import { TYPES } from "../../../config/di/types";
import { ICompanyRepository, IUserRepository, IBranchRepository } from "../database/repositories/interfaces";
import { CompanyUpdate } from "../database/schema/company";

@injectable()
export class MergeService implements IMergeService {
    constructor(
        @inject(TYPES.ICompanyRepository) private companyRepository: ICompanyRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.IBranchRepository) private branchRepository: IBranchRepository,
        @inject(TYPES.ICompanyService) private companyService: ICompanyService,
        @inject(TYPES.Database) private db: Kysely<Database>
    ) { }

    async mergeCompanies(
        targetCompanyId: string,
        duplicateCompanyId: string,
        targetCompany: CompanyUpdate
    ): Promise<void> {
        const doesExist = await this.companyService.doCompaniesExist([targetCompanyId, duplicateCompanyId])
        if(!doesExist){
            // Maybe would be better to do the searches individually because
            // this doesn't tell us which of the two companies doesn't exist, but for simplicity's sake we'll just throw a generic error
            throw new Error("Companies with provided ids do not both exist");
        }

        await this.db.transaction().execute(async (trx) => {
            await this.userRepository.reparentUsers(targetCompanyId, duplicateCompanyId, trx);
            await this.branchRepository.reparentBranches(targetCompanyId, duplicateCompanyId, trx);
            await this.companyRepository.update(targetCompanyId, targetCompany, trx)
            await this.companyRepository.delete(duplicateCompanyId, trx);
        });
    }


}