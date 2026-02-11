import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/di/types";
import { IMergeController } from "./interfaces";
import { BaseController } from "../../../common";
import { IMergeService } from "../services/interfaces";

@injectable()
export class MergeController extends BaseController implements IMergeController {
    constructor(
        @inject(TYPES.IMergeService) private mergeService: IMergeService
    ) {
        super();
    }

    mergeConflicts = this.handleAsync(async (_req, res) => {
        this.mergeService;
        res.status(200).json({});
    });

    mergeComplete = this.handleAsync(async (_req, res) => {
        res.status(200).json({});
    });
}