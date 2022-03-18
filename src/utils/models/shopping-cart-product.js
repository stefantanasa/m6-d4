import sequelize from "../db/db-connection.js";
import { DataTypes } from "sequelize";

const ShoppingCartProducts = sequelize.define("shoppingCartProducts", {});
export default ShoppingCartProducts;
