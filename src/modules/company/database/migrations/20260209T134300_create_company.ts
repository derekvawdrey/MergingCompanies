import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('company')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(db.fn('gen_random_uuid')))
    .addColumn('name', 'varchar', (col) => col.notNull())
    // Again depending on the situation, we'd most likely want to have a 
    // seperate table for addresses. 
    .addColumn('address_line_1', 'varchar', (col) => col.notNull())
    .addColumn('address_line_2', 'varchar', (col) => col.notNull())
    .addColumn('city', 'varchar', (col) => col.notNull())
    .addColumn('state', 'varchar', (col) => col.notNull())
    .addColumn('postal_code', 'varchar', (col) => col.notNull())
    .execute()

    
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('company').execute()
}

