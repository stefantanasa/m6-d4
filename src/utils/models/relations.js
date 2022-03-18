import Product from "./product-model.js";
import Review from "./review-model.js";
import Category from "./category-model.js";
import User from "./user-model.js";
import CategoryProduct from "./shopping-cart-product.js";
import ShoppingCart from "./shopping-cart.js";
import ShoppingCartProducts from "./shopping-cart-product.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

Category.belongsToMany(Product, { through: CategoryProduct });
Product.belongsToMany(Category, { through: CategoryProduct });

User.hasOne(ShoppingCart);
ShoppingCart.belongsTo(User);

ShoppingCart.belongsToMany(Product, { through: ShoppingCartProducts });
Product.belongsToMany(ShoppingCart, { through: ShoppingCartProducts });

User.hasMany(Review);
Review.belongsTo(User);

export {
  Review,
  Product,
  Category,
  User,
  CategoryProduct,
  ShoppingCart,
  ShoppingCartProducts,
};
