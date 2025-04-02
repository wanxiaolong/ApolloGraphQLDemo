const tableName = "author"

//up()方法是knex在migrate的时候会执行的函数
exports.up = function(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.string('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
  });
};

//down()方法是knex在rollback的时候会执行的函数
exports.down = function(knex) {
  return knex.schema.dropTable(tableName);
};
