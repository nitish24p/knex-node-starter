const addBaseColumns = require('./../server/helpers/baseColumnMigration');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', (table) => {
    table.increments('id').unsigned().primary();
    table.string('title').notNull();
    table.text('text').notNull();
    table.integer('user_id').unsigned().references('users.id');

    addBaseColumns(knex, table);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
