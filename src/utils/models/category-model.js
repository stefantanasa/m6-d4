import sequelize from "../db/db-connection.js";
import { DataTypes } from "sequelize";

const Review = sequelize.define(
  "review",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
export default Review;
