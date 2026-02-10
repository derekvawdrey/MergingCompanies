import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('branch')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(db.fn('gen_random_uuid')))
    .addColumn('company_id', 'uuid', (col) =>
      col.references('company.id').onDelete('cascade').notNull()
    )
    .addColumn('name', 'varchar', (col) => col.notNull())
    .execute()

  // Because we will be looking for branches and users connected to companies, we should index them
  await db.schema
    .createIndex('branch_company_id_index')
    .on('branch')
    .column('company_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('branch').execute()
}