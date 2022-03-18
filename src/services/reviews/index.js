import express from "express";
import sequelize from "../../utils/db/db-connection.js";
import Review from "../../utils/models/review-model.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Review.findAll();
    res.send(data);
  } catch (error) {
    console.log("❤️", error);
  }
});
reviewsRouter.post("/:productId", async (req, res, next) => {
  try {
    const toPost = {
      ...req.body,
      productId: req.params.productId,
    };
    // console.log(toPost);
    const newReview = await Review.create(toPost);
    res.status(200).send({ newReview });
  } catch (error) {
    console.log("❤️", error);
  }
});
reviewsRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId);

    res.send(review);
  } catch (error) {
    console.log("❤️", error);
  }
});
reviewsRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    const deletedReview = await Review.destroy({
      where: { id: req.params.reviewId },
    });
    res.send({ deletedReview });
  } catch (error) {
    console.log("❤️", error);
  }
});
reviewsRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const updated = await Review.update(req.body, {
      where: { id: req.params.reviewId },
    });
    res.status(200).send(updated);
  } catch (error) {
    console.log("❤️", error);
  }
});

export default reviewsRouter;
