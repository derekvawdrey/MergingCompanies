import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './database.types'

const dialect = new PostgresDialect({
    pool: new Pool({
        database: process.env.POSTGRES_DB || 'test',
        host: process.env.POSTGRES_HOST || 'localhost',
        user: process.env.POSTGRES_USER || 'admin',
        password: process.env.POSTGRES_PASSWORD || 'admin',
        port: parseInt(process.env.POSTGRES_PORT || '5434', 10),
        max: parseInt(process.env.POSTGRES_MAX_CONNECTIONS || '10', 10),
    })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
    dialect,
})