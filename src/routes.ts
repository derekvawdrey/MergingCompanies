import { Router } from "express";
import companyRoutes from "./modules/company/routes";
import mergeRoutes from "./modules/merge/routes";

const router = Router();

router.use("/companies", companyRoutes);
// Merge is primarily used for companies now, so the route to get there will be /company.
router.use("/companies", mergeRoutes);

export default router;