import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/di/types";
import { IMergeController } from "./interfaces";
import { BaseController } from "../../../common";
import { IMergeService } from "../services/interfaces";
import { matchedData } from 'express-validator';
import { MergeCompleteCompanyUpdate } from "../types/merge.types";

@injectable()
export class MergeController extends BaseController implements IMergeController {
    constructor(
        @inject(TYPES.IMergeService) private mergeService: IMergeService
    ) {
        super();
    }

    previewMerge = this.handleAsync(async (req, res) => {
        const { targetId, duplicateId } = req.params as { targetId: string; duplicateId: string };
        const conflicts = await this.mergeService.getMergeConflicts(targetId, duplicateId);
        res.status(200).json(conflicts);
    });

    completeMerge = this.handleAsync(async (req, res) => {
        const { targetId, duplicateId } = req.params as { targetId: string; duplicateId: string };
        const companyUpdate = matchedData(req) as MergeCompleteCompanyUpdate;
        await this.mergeService.mergeCompanies(targetId, duplicateId, companyUpdate);
        res.status(200).json({});
    });
}