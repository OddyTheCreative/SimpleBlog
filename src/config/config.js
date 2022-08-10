import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    username: "root",
    password: "nana7221",
    database: "simpleblog",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export default config;
