import { inject, injectable } from "inversify";
import { IMergeService } from "./interfaces";
import { Kysely } from "kysely";
import { Database } from "../../../config/database/database.types";
import { TYPES } from "../../../config/di/types";
import { ICompanyRepository, IUserRepository, IBranchRepository } from "../database/repositories/interfaces";

@injectable()
export class MergeService implements IMergeService {
    constructor(
        @inject(TYPES.ICompanyRepository) private companyRepository: ICompanyRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.IBranchRepository) private branchRepository: IBranchRepository,
        @inject(TYPES.Database) private db: Kysely<Database>
    ) { }

    async reparentChildren(
        targetCompanyId: string,
        duplicateCompanyId: string
    ): Promise<void> {
        await this.db.transaction().execute(async (trx) => {
            const companies = await this.companyRepository.findByIds([
                targetCompanyId,
                duplicateCompanyId,
            ], trx);

            if (companies.length !== 2) {
                throw new Error('One or both companies do not exist');
            }

            await this.userRepository.reparentUsers(targetCompanyId, duplicateCompanyId, trx);
            await this.branchRepository.reparentBranches(targetCompanyId, duplicateCompanyId, trx);
        });
    }


}