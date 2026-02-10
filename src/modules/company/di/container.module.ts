import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { ICompanyService } from "../services/interfaces";
import { CompanyService } from "../services/companyService";
import { TYPES } from "../../../config/di/types";
import { IBranchRepository, ICompanyRepository, IUserRepository } from "../database/repositories/interfaces";
import { CompanyRepository } from "../database/repositories/companyRepository";
import { UserRepository } from "../database/repositories/userRepository";
import { BranchRepository } from "../database/repositories/branchRepository";

export const companyContainersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {

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
    }
)