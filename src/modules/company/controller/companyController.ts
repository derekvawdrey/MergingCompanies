import { inject, injectable } from "inversify";
import { ICompanyController } from "./interfaces";
import { BaseController, HttpError } from "../../../common";
import { TYPES } from "../../../config/di/types";
import { ICompanyService } from "../services/interfaces";

@injectable()
export class CompanyController extends BaseController implements ICompanyController {
    constructor(
        @inject(TYPES.ICompanyService) private companyService: ICompanyService
    ) {
        super();
    }

    getCompany = this.handleAsync(async (req, res) => {
        const { companyId } = req.params as { companyId: string };
        const company = await this.companyService.getCompanyById(companyId);
        if (!company) {
            throw new HttpError(404, "Company with provided id does not exist");
        }
        res.status(200).json(company);
    });


    getCompanies = this.handleAsync(async (_req, res) => {
        const companies = await this.companyService.getAllCompanies();
        res.status(200).json(companies);
    });

}