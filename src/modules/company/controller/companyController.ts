import { injectable } from "inversify";
import { ICompanyController } from "./interfaces";
import { BaseController } from "../../../common";

@injectable()
export class CompanyController extends BaseController implements ICompanyController {
    constructor() {
        super();
    }

    getCompany = this.handleAsync(async (req, res) => {
        res.json({});
    });


    getCompanies = this.handleAsync(async (req, res) => {
        res.json({});
    });

}