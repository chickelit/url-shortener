import { Sequelize } from "sequelize";
import { shortenedUrlModel } from "./Models/ShortenedUrl";

export const sequelize = new Sequelize(process.env.MYSQL_CONNECTION_URL!, {
  dialect: "mysql",
  logging: false,
});

export const ShortenedUrl = shortenedUrlModel(sequelize);
