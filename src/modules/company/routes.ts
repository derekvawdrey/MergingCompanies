import { Router } from "express";
import { container } from "../../config/di/inversify.config";
import { TYPES } from "../../config/di/types";
import { ICompanyController } from "./controller/interfaces";

const router = Router();
const companyController = container.get<ICompanyController>(TYPES.ICompanyController);

router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompany);

export default router;
