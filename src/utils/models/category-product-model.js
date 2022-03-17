import sequelize from "../db/db-connection.js";
import { DataTypes } from "sequelize";

const CategoryProduct = sequelize.define("categoryProduct", {});
export default CategoryProduct;
