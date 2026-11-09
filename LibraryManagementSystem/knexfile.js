// knexfile.js

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: 5433,
      user: "postgres",
      password: "123456",
      database: "chapter4_demo",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
