import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    username: "root",
<<<<<<< HEAD
    password: "chl1wls2rhkd3",
    database: "simpleblog",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
=======
    password: "brocoli",
    database: "simpleblog",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: true,
>>>>>>> 655244adde7514d28456a4780a4066c2f733b903
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
