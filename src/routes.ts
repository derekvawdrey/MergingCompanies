import { Router } from "express";
import companyRoutes from "./modules/company/routes";

const router = Router();

router.use("/companies", companyRoutes);

export default router;