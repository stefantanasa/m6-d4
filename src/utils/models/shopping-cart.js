import sequelize from "../db/db-connection.js";
import { DataTypes } from "sequelize";

const ShoppingCart = sequelize.define("shoppingCart", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
});
export default ShoppingCart;
