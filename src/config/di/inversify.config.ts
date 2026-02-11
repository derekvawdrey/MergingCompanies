/**
 * This file enables dependency injection.
 */
import { Container } from "inversify";
import { Kysely } from "kysely";
import { companyContainersModule } from "../../modules/company/di/container.module";
import { TYPES } from "./types";
import { Database } from "../database/database.types";
import { db } from "../database/database";

const container = new Container();

container.bind<Kysely<Database>>(TYPES.Database).toConstantValue(db);

container.loadSync(
    companyContainersModule
);

export { container };