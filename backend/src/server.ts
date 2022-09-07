import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import { sequelize } from "./database/sequelize";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(routes);

app.listen(+process.env.PORT!, process.env.IP!, async () => {
  try {
    await sequelize.sync({
      force: true,
    });

    console.log(`App running on port: ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
  }
});
