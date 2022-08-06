import Sequelize from "sequelize";

import { sequelize } from "./sequelize.js";

export default class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true, // cratedAt
      paranoid: false, 
      underscored: false,
      modelName: "Comment",
      tableName: "comment",
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  }
  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
}