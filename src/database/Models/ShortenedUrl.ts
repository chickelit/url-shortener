import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ShortenedUrlAttributes {
  id: number;
  url: string;
}

interface ShortenedUrlCreationAttributes
  extends Optional<ShortenedUrlAttributes, "id"> {}

export class ShortenedUrlClass
  extends Model<ShortenedUrlAttributes, ShortenedUrlCreationAttributes>
  implements ShortenedUrlAttributes
{
  declare id: number;
  declare url: string;
}

export const shortenedUrlModel = (sequelize: Sequelize) => {
  ShortenedUrlClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  );

  return ShortenedUrlClass;
};
