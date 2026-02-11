import { inject, injectable } from "inversify";
import { ICompanyService, IMergeService } from "./interfaces";
import { Kysely } from "kysely";
import { Database } from "../../../config/database/database.types";
import { TYPES } from "../../../config/di/types";
import { ICompanyRepository, IUserRepository, IBranchRepository } from "../database/repositories/interfaces";
import { HttpError } from "../../../common";
import { MergeConflicts, MergeCompleteCompanyUpdate, MergeConflict } from "../types/merge.types";
import { Company } from "../database/schema/company";

@injectable()
export class MergeService implements IMergeService {
    constructor(
        @inject(TYPES.ICompanyRepository) private companyRepository: ICompanyRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.IBranchRepository) private branchRepository: IBranchRepository,
        @inject(TYPES.ICompanyService) private companyService: ICompanyService,
        @inject(TYPES.Database) private db: Kysely<Database>
    ) { }

    async getMergeConflicts(targetCompanyId: string, duplicateCompanyId: string): Promise<MergeConflicts> {
        const targetCompany = await this.companyService.getCompanyById(targetCompanyId);
        const duplicateCompany = await this.companyService.getCompanyById(duplicateCompanyId);
        const conflicts: MergeConflict[] = [];

        if (!targetCompany || !duplicateCompany) {
            throw new HttpError(404, "Companies with provided ids do not both exist");
        }

        for (const key of Object.keys(targetCompany) as (keyof Company)[]) {
            if (targetCompany[key] !== duplicateCompany[key]) {
                conflicts.push({
                    field: key,
                    valueType: "string",
                    targetValue: targetCompany[key],
                    duplicateValue: duplicateCompany[key]
                });
            }
        }

        return {
            conflicts: conflicts
        };

    }

    async mergeCompanies(
        targetCompanyId: string,
        duplicateCompanyId: string,
        targetCompany: MergeCompleteCompanyUpdate
    ): Promise<void> {
        const doesExist = await this.companyService.doCompaniesExist([targetCompanyId, duplicateCompanyId])
        if (!doesExist) {
            throw new HttpError(404, "Companies with provided ids do not both exist");
        }

        await this.db.transaction().execute(async (trx) => {
            await this.userRepository.reparentUsers(targetCompanyId, duplicateCompanyId, trx);
            await this.branchRepository.reparentBranches(targetCompanyId, duplicateCompanyId, trx);
            await this.companyRepository.update(targetCompanyId, targetCompany, trx)
            await this.companyRepository.delete(duplicateCompanyId, trx);
        });
    }


}