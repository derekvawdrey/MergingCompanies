/**
 * This file enables dependency injection.
 */
import { Container } from "inversify";
import { mergeContainersModule } from "../../modules/merge/di/container.module";
import { companyContainersModule } from "../../modules/company/di/container.module";

const container = new Container();

container.load(
    companyContainersModule,
    mergeContainersModule
);

export { container };