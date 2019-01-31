import Koa from "koa";
import Router from "koa-router";
import mongoose from "mongoose";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import { router as accommodationsRouter } from "./modules/accommodations/accommodationsController";
import { router as authRouter } from "./modules/auth/authController";
import { router as usersRouter } from "./modules/users/usersController";

const koa = new Koa();
const app = new Router();
mongoose.connect(
  "mongodb://mongo:27017/AMISBnB",
  { useNewUrlParser: true }
);

koa.use(cors());
app.use(bodyParser());

app.get("/", async ctx => {
  console.log("GET /");
  ctx.body = "Koa running";
});

app.use("/accommodations", accommodationsRouter.routes());
app.use("/auth", authRouter.routes());
app.use("/users", usersRouter.routes());
koa.use(app.routes());
koa.use(app.allowedMethods());

const server = koa.listen(3030);
console.log(`Koa up at ${server.address().address}:${server.address().port}`);
