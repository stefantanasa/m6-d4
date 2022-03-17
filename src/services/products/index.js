import express from "express";
import sequelize from "../../utils/db/db-connection.js";
import { Product, Review } from "../../utils/models/relations.js";
import { Op } from "sequelize";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const areQueries = Object.keys(req.query);

    if (areQueries.length !== 0) {
      console.log("There are queries!");

      const data = await Product.findAll({
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

      const data = await Product.findAll({
        include: Review,
      });
      res.send(data);
    }
  } catch (error) {
    console.log("❤️", error);
  }
});
productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = Product.create(req.body);
    res.status(200).send({ newProduct });
  } catch (error) {
    console.log("❤️", error);
  }
});
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    console.log("id: ", req.params.productId);

    res.send(product);
  } catch (error) {
    console.log("❤️", error);
  }
});
productsRouter.delete("/:productId", (req, res, next) => {
  try {
    const deletedProduct = Product.destroy({
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
productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const updated = await Product.update(req.body, {
      where: { id: req.params.productId },
    });
    res.status(200).send(updated);
  } catch (error) {
    console.log("❤️", error);
  }
});

export default productsRouter;
