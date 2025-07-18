import { Knex } from "knex";
import { Model } from "objection";

const config = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "example.db",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};

export const knex = Knex(config.development);

Model.knex(knex);
