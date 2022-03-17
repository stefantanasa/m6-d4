import Product from "./product-model.js";
import Review from "./review-model.js";
import Category from "./category-model.js";
import User from "./user-model.js";
import CategoryProduct from "./category-product-model.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

Category.belongsToMany(Product, { through: CategoryProduct });
Product.belongsToMany(Category, { through: CategoryProduct });

export { Review, Product, Category };
