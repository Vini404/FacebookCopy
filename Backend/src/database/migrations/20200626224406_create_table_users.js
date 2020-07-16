
exports.up = function(knex) {
    return knex.schema.createTable("users",function(table){
        table.string("id").primary()
        table.text("nome").notNullable()
        table.text("sobrenome").notNullable()
        table.text("usuario").notNullable().unique()
        table.text("email").notNullable().unique()
        table.text("senha").notNullable()

    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("users")
  };
  