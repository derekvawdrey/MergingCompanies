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
        if (targetCompanyId === duplicateCompanyId) {
            throw new HttpError(400, "Companies must not have the same ID");
        }

        const targetCompany = await this.companyService.getCompanyById(targetCompanyId);
        const duplicateCompany = await this.companyService.getCompanyById(duplicateCompanyId);
        const conflicts: MergeConflict[] = [];

        if (!targetCompany || !duplicateCompany) {
            throw new HttpError(404, "Companies with provided ids do not both exist");
        }

        // Grab only the fields we want to compare, currently id is excluded since it doesn't make sense to compare those.
        const editableKeys = (Object.keys(targetCompany) as (keyof Company)[]).filter(
            (k) => k !== "id"
        );
        
        for (const key of editableKeys) {
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
        if (targetCompanyId === duplicateCompanyId) {
            throw new HttpError(400, "Companies must not have the same ID");
        }

        // Throw everything into transaction since we want to ensure all-or-nothing for this operation
        await this.db.transaction().execute(async (trx) => {
            const [target, duplicate] = await Promise.all([
                this.companyRepository.findById(targetCompanyId, trx),
                this.companyRepository.findById(duplicateCompanyId, trx),
            ]);

            if (!target || !duplicate) {
                throw new HttpError(404, "Companies with provided ids do not both exist");
            }

            await Promise.all([
                this.userRepository.reparentUsers(target.id, duplicate.id, trx),
                this.branchRepository.reparentBranches(target.id, duplicate.id, trx)
            ]);

            await this.companyRepository.update(target.id, targetCompany, trx)
            await this.companyRepository.delete(duplicate.id, trx);
        });
    }


}