// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database:"postgres",
      user:"postgres",
      password:"123",
      port:3000,

    },
    migrations:{
      tableName:"db",
      directory:`${__dirname}/src/database/migrations`
    }

   

  }
};
  