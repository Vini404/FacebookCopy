
exports.up = function(knex) {
    return knex.schema.createTable("post",function(table){
        table.string("name")
        table.string("legenda")
        table.increments("ProjectId")
        table.string("url")
        table.string("user_id")
        table.foreign("user_id").references('id').inTable("users")

        table.timestamps(true,true)
       
       
      
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("post")
  };
  