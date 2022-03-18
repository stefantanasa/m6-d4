import sequelize from "../db/db-connection.js";
import { DataTypes } from "sequelize";

const ShoppingCart = sequelize.define("shoppingCart", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default ShoppingCart;
