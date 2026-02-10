import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { IMergeService } from "../services/interfaces";
import { TYPES } from "../../../config/di/types";
import { MergeService } from "../services/mergeService";

export const mergeContainersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        options.bind<IMergeService>(TYPES.IMergeService)
            .to(MergeService)
            .inSingletonScope();
    }
)