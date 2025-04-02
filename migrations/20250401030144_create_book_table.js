const tableName = "book";

exports.up = function(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.integer('pageCount').notNullable();
    table.string('authorId').references('id').inTable('author').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(tableName);
};
