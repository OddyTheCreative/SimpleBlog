import express from "express";
import morgan from "morgan";

import { sequelize } from "./models/index.js";

const app = express();

app.set("port", 1000);
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => console.log("db connect"))
  .catch(err => console.error(err));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 존재하지 않습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  return res.json(
    {
      success: false,
      message: err.message,
      result: err,
    },
  );
});