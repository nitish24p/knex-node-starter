const addBaseColumns = require('./../server/helpers/baseColumnMigration');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name').notNull();
    table.string('username').notNull();
    table.string('password').notNull();
    table.string('email').notNull();

    addBaseColumns(knex, table);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
