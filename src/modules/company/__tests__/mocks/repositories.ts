import {
  ICompanyRepository,
  IUserRepository,
  IBranchRepository,
} from "../../database/repositories/interfaces";

export class MockCompanyRepository implements ICompanyRepository {
  findByIds = jest.fn();
  findAll = jest.fn();
  search = jest.fn();
  create = jest.fn();
  findById = jest.fn();
  update = jest.fn();
  delete = jest.fn();
}

export class MockUserRepository implements IUserRepository {
  findById = jest.fn();
  findByCompanyId = jest.fn();
  create = jest.fn();
  update = jest.fn();
  delete = jest.fn();
  reparentUsers = jest.fn();
}

export class MockBranchRepository implements IBranchRepository {
  findById = jest.fn();
  findByCompanyId = jest.fn();
  create = jest.fn();
  update = jest.fn();
  delete = jest.fn();
  reparentBranches = jest.fn();
}
