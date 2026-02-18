import { Container } from "inversify";
import { Kysely } from "kysely";
import { Database } from "../database/database.types";
import { TYPES } from "../di/types";
import { ICompanyRepository, IUserRepository, IBranchRepository } from "../../modules/company/database/repositories/interfaces";
import { ICompanyService } from "../../modules/company/services/interfaces";
import { MergeService } from "../../modules/company/services/mergeService";
import {
  MockCompanyService,
  MockCompanyRepository,
  MockUserRepository,
  MockBranchRepository,
  MockDB,
} from "../../modules/company/__tests__/mocks";

declare global {
  // eslint-disable-next-line no-var
  var __TEST_CONTAINER__: Container | undefined;
}

function initTestContainer(): void {
  const container = new Container();

  const mockCompanyService = new MockCompanyService();
  const mockCompanyRepo = new MockCompanyRepository();
  const mockUserRepo = new MockUserRepository();
  const mockBranchRepo = new MockBranchRepository();
  const mockDb = new MockDB();

  container.bind<ICompanyService>(TYPES.ICompanyService).toConstantValue(mockCompanyService);
  container.bind<ICompanyRepository>(TYPES.ICompanyRepository).toConstantValue(mockCompanyRepo);
  container.bind<IUserRepository>(TYPES.IUserRepository).toConstantValue(mockUserRepo);
  container.bind<IBranchRepository>(TYPES.IBranchRepository).toConstantValue(mockBranchRepo);
  container.bind<Kysely<Database>>(TYPES.Database).toConstantValue(mockDb as unknown as Kysely<Database>);
  container.bind<MergeService>(TYPES.IMergeService).to(MergeService).inSingletonScope();

  global.__TEST_CONTAINER__ = container;
}

initTestContainer();
