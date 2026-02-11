import { Router } from "express";
import { container } from "../../config/di/inversify.config";
import { TYPES } from "../../config/di/types";
import { ICompanyController, IMergeController } from "./controller/interfaces";
import { handleValidationErrors } from "../../common/middleware/validation.middleware";
import { mergeParamValidator, mergeCompleteValidator } from "./validators";

const router = Router();
const companyController = container.get<ICompanyController>(TYPES.ICompanyController);
const mergeController = container.get<IMergeController>(TYPES.IMergeController);

router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompany);
router.get(
    "/:targetId/preview-merge/:duplicateId",
    mergeParamValidator,
    handleValidationErrors,
    mergeController.previewMerge
);
router.post(
    "/:targetId/merge/:duplicateId",
    mergeParamValidator,
    mergeCompleteValidator,
    handleValidationErrors,
    mergeController.completeMerge
);

export default router;
