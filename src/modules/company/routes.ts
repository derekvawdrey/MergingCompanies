import { Router } from "express";
import { container } from "../../config/di/inversify.config";
import { TYPES } from "../../config/di/types";
import { ICompanyController, IMergeController } from "./controller/interfaces";
import { handleValidationErrors } from "../../common/middleware/validation.middleware";
import { mergeConflictsValidator, mergeCompleteValidator } from "./validators";

const router = Router();
const companyController = container.get<ICompanyController>(TYPES.ICompanyController);
const mergeController = container.get<IMergeController>(TYPES.IMergeController);

router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompany);
router.get(
    "/:targetId/preview-merge/:duplicateId",
    mergeConflictsValidator,
    handleValidationErrors,
    mergeController.previewMerge
);
router.post(
    "/:targetId/merge/:duplicateId",
    mergeCompleteValidator,
    handleValidationErrors,
    mergeController.completeMerge
);

export default router;
