import express from "express";
import { testDB, syncDB } from "./utils/db/db-connection.js";
import productsRouters from "./services/products/index.js";
import reviewsRouters from "./services/reviews/index.js";
import usersRouters from "./services/user/index.js";
import categoriesRouters from "./services/category/index.js";
import shoppingCartRouters from "./services/shopping-cart/index.js";
import cors from "cors";

const server = express();

server.use(express.json());
server.use("/products", productsRouters);
server.use("/reviews", reviewsRouters);
server.use("/users", usersRouters);
server.use("/categories", categoriesRouters);
server.use("/shoppingCart", shoppingCartRouters);
server.use(cors());
const port = process.env.port;

const initialize = async () => {
  try {
    server.listen(port, async () => {
      console.log("💚Server is running!");
      await testDB();
      await syncDB();
    });

    server.on("error", (error) => {
      console.log("❤️Server is not running", error);
    });
  } catch (error) {
    console.log("❤️There is an error", error);
  }
};

initialize();
