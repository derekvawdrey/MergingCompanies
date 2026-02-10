import * as path from 'path'
import { Pool } from 'pg'
import { promises as fs } from 'fs'
import {
    Kysely,
    Migrator,
    PostgresDialect,
    FileMigrationProvider,
} from 'kysely'
import { Database } from '../config/database/database.types'

async function migrateToLatest() {
    const db = new Kysely<Database>({
        dialect: new PostgresDialect({
            pool: new Pool({
                database: process.env.POSTGRES_DB || 'test',
                host: process.env.POSTGRES_HOST || 'localhost',
                user: process.env.POSTGRES_USER || 'admin',
                password: process.env.POSTGRES_PASSWORD || 'admin',
                port: parseInt(process.env.POSTGRES_PORT || '5434', 10),
                max: parseInt(process.env.POSTGRES_MAX_CONNECTIONS || '10', 10),
            }),
        }),
    })

    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: path.join(__dirname, 'migrations'),
        }),
    })

    const { error, results } = await migrator.migrateToLatest()

    results?.forEach((it) => {
        if (it.status === 'Success') {
            console.log(`migration "${it.migrationName}" was executed successfully`)
        } else if (it.status === 'Error') {
            console.error(`failed to execute migration "${it.migrationName}"`)
        }
    })

    if (error) {
        console.error('failed to migrate')
        console.error(error)
        process.exit(1)
    }

    await db.destroy()
}

migrateToLatest()