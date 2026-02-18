import { HttpError } from "../../../common";
import { TYPES } from "../../../config/di/types";
import { getTestContainer } from "../../../config/tests/testContainer";
import { Company } from "../database/schema/company";
import { MergeService } from "../services/mergeService";
import {
  MockCompanyService,
  MockCompanyRepository,
  MockUserRepository,
  MockBranchRepository,
  MockDB,
} from "./mocks/index";

describe('MergeService', () => {
  let mockMergeService: MergeService;
  let mockCompanyService: MockCompanyService;
  let mockCompanyRepo: MockCompanyRepository;
  let mockUserRepo: MockUserRepository;
  let mockBranchRepo: MockBranchRepository;
  let mockDb: MockDB;

  beforeEach(() => {
    jest.clearAllMocks();
    const container = getTestContainer();
    mockCompanyService = container.get<MockCompanyService>(TYPES.ICompanyService);
    mockCompanyRepo = container.get<MockCompanyRepository>(TYPES.ICompanyRepository);
    mockUserRepo = container.get<MockUserRepository>(TYPES.IUserRepository);
    mockBranchRepo = container.get<MockBranchRepository>(TYPES.IBranchRepository);
    mockDb = container.get<MockDB>(TYPES.Database);
    mockMergeService = container.get<MergeService>(TYPES.IMergeService);
  });

  describe('getMergeConflicts', () => {
    it('throws 400 if IDs match', async () => {
      await expect(mockMergeService.getMergeConflicts('1', '1')).rejects.toThrow(HttpError);
      expect(mockCompanyService.getCompanyById).not.toHaveBeenCalled();
    });

    it('throws 404 if company missing', async () => {
      mockCompanyService.getCompanyById
        .mockResolvedValueOnce(null as any)
        .mockResolvedValueOnce({} as Company);
      await expect(mockMergeService.getMergeConflicts('1', '2')).rejects.toThrow(HttpError);
    });

    it('returns conflicts for differing fields', async () => {
      const target: Company = { id: '1', name: 'Target', email: 't@test.com' } as unknown as Company;
      const dupe: Company = { id: '2', name: 'Dupe', email: 't@test.com' } as unknown as Company;
      mockCompanyService.getCompanyById
        .mockResolvedValueOnce(target)
        .mockResolvedValueOnce(dupe);

      const result = await mockMergeService.getMergeConflicts('1', '2');
      expect(result.conflicts).toEqual([{ field: 'name', valueType: 'string', targetValue: 'Target', duplicateValue: 'Dupe' }]);
    });
  });

  describe('mergeCompanies', () => {
    it('throws 400 if IDs match', async () => {
      await expect(mockMergeService.mergeCompanies('1', '1', {})).rejects.toThrow(HttpError);
    });

    it('throws 404 if company missing', async () => {
      const trxMock = {};
      (mockDb as any).transaction = () => ({
        execute: jest.fn((fn: (trx: unknown) => Promise<Company>) => Promise.resolve(fn(trxMock))),
      });

      mockCompanyRepo.findById
        .mockResolvedValueOnce(null as any)
        .mockResolvedValueOnce({ id: '2' } as Company);
      await expect(mockMergeService.mergeCompanies('1', '2', {})).rejects.toThrow(HttpError);
    });
  });
});