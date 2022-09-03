import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import path from "path";
import routes from "./routes";
import { sequelize } from "./database/sequelize";
import link from "./views/helpers/link";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  "handlebars",
  engine({
    helpers: {
      link,
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(routes);

app.listen(process.env.PORT, async () => {
  try {
    await sequelize.sync({
      force: true,
    });

    console.log(`App running on port: ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
  }
});
