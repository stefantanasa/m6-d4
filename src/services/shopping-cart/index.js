import express from "express";
import sequelize from "../../utils/db/db-connection.js";
import {
  Product,
  Review,
  CategoryProduct,
  Category,
  User,
  ShoppingCart,
} from "../../utils/models/relations.js";
import { Op } from "sequelize";

const shoppingCartRouter = express.Router();

shoppingCartRouter.get("/", async (req, res, next) => {
  try {
    const areQueries = Object.keys(req.query);

    if (areQueries.length !== 0) {
      console.log("There are queries!");

      const data = await ShoppingCart.findAll({
        where: {
          ...(req.query && {
            [Op.or]: [
              {
                name: { [Op.iLike]: `%${req.query.search}%` },
              },
              { description: { [Op.iLike]: `%${req.query.search}%` } },
            ],
          }),
          ...(req.query.price && {
            price: {
              [Op.between]: req.query.price.split(","),
            },
          }),
        },
        ...(req.query.order && {
          order: [req.query.order.split(",")],
        }),
      });
      res.send(data);
    } else {
      console.log("There are no queries!");

      const data = await ShoppingCart.findAll({
        include: [
          {
            model: Review,
            include: User,
          },
          {
            model: Category,
            through: { attributes: [] },
          },
        ],
      });
      res.send(data);
    }
  } catch (error) {
    console.log("❤️", error);
  }
});

shoppingCartRouter.post("/:productId", async (req, res, next) => {
  try {
    const toPost = {
      ...req.body,
      productId: req.params.productId,
    };
    // console.log(toPost);
    const newReview = Review.create(toPost);
    res.status(200).send({ toPost });
  } catch (error) {
    console.log("❤️", error);
  }
});
shoppingCartRouter.delete("/:productId", (req, res, next) => {
  try {
    const deletedProduct = ShoppingCart.destroy({
      truncate: true,
      where: {
        id: req.params.id,
      },
    });
    res.status(404).send(deletedProduct);
  } catch (error) {
    console.log("❤️", error);
  }
});
shoppingCartRouter.put("/:productId", async (req, res, next) => {
  try {
    const updated = await ShoppingCart.update(req.body, {
      where: { id: req.params.productId },
    });
    res.status(200).send(updated);
  } catch (error) {
    console.log("❤️", error);
  }
});

export default shoppingCartRouter;
