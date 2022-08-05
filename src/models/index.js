export * from "./sequelize.js";
import sequelize from "./sequelize.js";

const db = {};

db.sequelize = sequelize;

export {
  db,
};