import Product from "./product-model.js";
import Review from "./review-model.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

export { Review, Product };
