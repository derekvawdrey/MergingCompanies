import { Router } from "express";
import { container } from "../../config/di/inversify.config";
import { TYPES } from "../../config/di/types";
import { IMergeController } from "./controllers/interfaces";
import { handleValidationErrors } from "../../common/middleware/validation.middleware";
import {
    mergeConflictsValidator,
    mergeCompleteValidator,
} from "./validators";

const router = Router();
const mergeController = container.get<IMergeController>(TYPES.IMergeController);

router.get(
    "/:targetId/preview/:duplicateId",
    mergeConflictsValidator,
    handleValidationErrors,
    mergeController.mergeConflicts
);
router.post(
    "/:targetId/merge/:duplicateId",
    mergeCompleteValidator,
    handleValidationErrors,
    mergeController.mergeComplete
);

export default router;
