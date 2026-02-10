import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { IMergeService } from "../services/interfaces";
import { TYPES } from "../../../config/di/types";
import { MergeService } from "../services/mergeService";
import { IMergeController } from "../controllers/interfaces";
import { MergeController } from "../controllers/mergeController";

export const mergeContainersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // Controllers
        options.bind<IMergeController>(TYPES.IMergeController)
            .to(MergeController)
            .inSingletonScope();

        // Services
        options.bind<IMergeService>(TYPES.IMergeService)
            .to(MergeService)
            .inSingletonScope();
    }
)