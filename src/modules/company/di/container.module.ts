import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { ICompanyController, IMergeController } from "../controller/interfaces";
import { CompanyController } from "../controller/companyController";
import { ICompanyService, IMergeService } from "../services/interfaces";
import { CompanyService } from "../services/companyService";
import { TYPES } from "../../../config/di/types";
import { IBranchRepository, ICompanyRepository, IUserRepository } from "../database/repositories/interfaces";
import { CompanyRepository } from "../database/repositories/companyRepository";
import { UserRepository } from "../database/repositories/userRepository";
import { BranchRepository } from "../database/repositories/branchRepository";
import { MergeService } from "../services/mergeService";
import { MergeController } from "../controller/mergeController";

export const companyContainersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {

        // Controllers
        options.bind<ICompanyController>(TYPES.ICompanyController)
            .to(CompanyController)
            .inSingletonScope();
        options.bind<IMergeController>(TYPES.IMergeController)
            .to(MergeController)
            .inSingletonScope();

        // Repositories
        options.bind<ICompanyRepository>(TYPES.ICompanyRepository)
            .to(CompanyRepository)
            .inSingletonScope();
        options.bind<IUserRepository>(TYPES.IUserRepository)
            .to(UserRepository)
            .inSingletonScope();
        options.bind<IBranchRepository>(TYPES.IBranchRepository)
            .to(BranchRepository)
            .inSingletonScope();


        // Services
        options.bind<ICompanyService>(TYPES.ICompanyService)
            .to(CompanyService)
            .inSingletonScope();
        options.bind<IMergeService>(TYPES.IMergeService)
            .to(MergeService)
            .inSingletonScope();
    }
)