import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from '../config/database/database.types'
import type { NewCompany } from '../modules/company/database/schema/company'
import type { NewUser } from '../modules/company/database/schema/user'
import type { NewBranch } from '../modules/company/database/schema/branch'

async function seed() {
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

    const existing = await db.selectFrom('company').select('id').limit(1).execute()
    if (existing.length > 0) {
        console.log('Database already has data; skipping seed.')
        await db.destroy()
        return
    }

    const companies: Omit<NewCompany, 'id'>[] = [
        {
            name: 'Acme Corp',
            address_line_1: '123 Main St',
            address_line_2: 'Suite 100',
            city: 'Springfield',
            state: 'IL',
            postal_code: '62701',
        },
        {
            name: 'Globex Industries',
            address_line_1: '456 Industrial Pkwy',
            address_line_2: '',
            city: 'Shelbyville',
            state: 'IL',
            postal_code: '62565',
        },
    ]

    const insertedCompanies = await db
        .insertInto('company')
        .values(companies)
        .returning(['id', 'name'])
        .execute()

    console.log(`Seeded ${insertedCompanies.length} companies.`)

    const users: Omit<NewUser, 'id'>[] = []
    const branches: Omit<NewBranch, 'id'>[] = []

    for (const company of insertedCompanies) {
        if (company.name === 'Acme Corp') {
            users.push(
                { company_id: company.id, first_name: 'Alice', last_name: 'Smith' },
                { company_id: company.id, first_name: 'Bob', last_name: 'Jones' }
            )
            branches.push(
                { company_id: company.id, name: 'Downtown' },
                { company_id: company.id, name: 'Airport' }
            )
        } else {
            users.push(
                { company_id: company.id, first_name: 'Carol', last_name: 'Williams' }
            )
            branches.push(
                { company_id: company.id, name: 'HQ' }
            )
        }
    }

    await db.insertInto('user').values(users).execute()
    console.log(`Seeded ${users.length} users.`)

    await db.insertInto('branch').values(branches).execute()
    console.log(`Seeded ${branches.length} branches.`)

    await db.destroy()
    console.log('Seed completed.')
}

seed().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
})
