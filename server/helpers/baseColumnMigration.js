// This is a base model migration to be added whenever new tables are created

const addBaseColumns = (knex, table) => {
    table.integer('created_by').unsigned().nullable().references('users.id');
    table.dateTime('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('modified_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.dateTime('deleted_at').nullable();
    table.integer('modified_by').unsigned().nullable().references('users.id');
}

module.exports = addBaseColumns;