import express from "express";
import sequelize from "../../utils/db/db-connection.js";
import User from "../../utils/models/user-model.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const data = await User.findAll();
    res.send(data);
  } catch (error) {
    console.log("❤️", error);
  }
});
userRouter.post("/:userId", async (req, res, next) => {
  try {
    const toPost = {
      ...req.body,
      userId: req.params.userId,
    };
    // console.log(toPost);
    const newUser = User.create(toPost);
    res.status(200).send({ toPost });
  } catch (error) {
    console.log("❤️", error);
  }
});
userRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await user.findByPk(req.params.userId);

    res.send(user);
  } catch (error) {
    console.log("❤️", error);
  }
});
userRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deleteUser = await User.destroy({
      where: { id: req.params.userId },
    });
    res.send({ deleteUser });
  } catch (error) {
    console.log("❤️", error);
  }
});
userRouter.put("/:userId", async (req, res, next) => {
  try {
    const updated = await User.update(req.body, {
      where: { id: req.params.userId },
    });
    res.status(200).send(updated);
  } catch (error) {
    console.log("❤️", error);
  }
});

export default userRouter;
