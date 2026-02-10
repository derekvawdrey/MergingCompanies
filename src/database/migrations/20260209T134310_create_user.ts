import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(db.fn('gen_random_uuid')))
    .addColumn('company_id', 'uuid', (col) =>
      col.references('company.id').onDelete('cascade').notNull()
    )
    .addColumn('first_name', 'varchar', (col) => col.notNull())
    .addColumn('last_name', 'varchar', (col) => col.notNull())
    .execute()

  
  await db.schema
    .createIndex('user_company_id_index')
    .on('user')
    .column('company_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute()
}

