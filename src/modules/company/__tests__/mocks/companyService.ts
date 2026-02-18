import { ICompanyService } from "../../services/interfaces";

export class MockCompanyService implements ICompanyService {
  getCompaniesByIds = jest.fn();
  getAllCompanies = jest.fn();
  searchCompany = jest.fn();
  updateCompany = jest.fn();
  deleteCompany = jest.fn();
  getCompanyById = jest.fn();
}
