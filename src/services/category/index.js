import express from "express";
import sequelize from "../../utils/db/db-connection.js";
import Category from "../../utils/models/category-model.js";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res, next) => {
  try {
    const data = await Category.findAll();
    res.send(data);
  } catch (error) {
    console.log("❤️", error);
  }
});
categoryRouter.post("/", async (req, res, next) => {
  try {
    const newCategory = Category.create(req.body);
    res.status(200).send({ newCategory });
  } catch (error) {
    console.log("❤️", error);
  }
});
categoryRouter.get("/:categoryId", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.categoryId);

    res.send(category);
  } catch (error) {
    console.log("❤️", error);
  }
});
categoryRouter.delete("/:categoryId", async (req, res, next) => {
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.categoryId },
    });
    res.send({ deleteCategory });
  } catch (error) {
    console.log("❤️", error);
  }
});
categoryRouter.put("/:categoryId", async (req, res, next) => {
  try {
    const updated = await Category.update(req.body, {
      where: { id: req.params.categoryId },
    });
    res.status(200).send(updated);
  } catch (error) {
    console.log("❤️", error);
  }
});

export default categoryRouter;
