import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ShortenedUrlAttributes {
  id: number;
  key: string;
  originalUrl: string;
  shortenedUrl: string;
}

interface ShortenedUrlCreationAttributes
  extends Optional<ShortenedUrlAttributes, "id"> {}

export class ShortenedUrlClass
  extends Model<ShortenedUrlAttributes, ShortenedUrlCreationAttributes>
  implements ShortenedUrlAttributes
{
  declare id: number;
  declare key: string;
  declare originalUrl: string;
  declare shortenedUrl: string;
}

export const shortenedUrlModel = (sequelize: Sequelize) => {
  ShortenedUrlClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      originalUrl: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      shortenedUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "shortened_urls",
    }
  );

  return ShortenedUrlClass;
};
