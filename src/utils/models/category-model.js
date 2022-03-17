import sequelize from "../db/db-connection.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
  "category",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
export default Category;
