import Router from "koa-router";
import User from "./usersSchema";
import bcrypt from "bcrypt";
import { isAuth, getUserId } from "../auth/helpers";

export const router = new Router();

router.post("/", async ctx => {
  console.log(`POST /users`);
  const user = ctx.request.body;
  const existingUser = await User.findOne({ $or: [({ email: user.email }, { username: user.username })] });
  if (!user.email || !user.username || !user.password) {
    const error = `please provide email, username and password`;
    console.log(error);
    ctx.throw(400, error);
  }
  if (existingUser) {
    const error = "This email and/or username are already in use";
    console.log(error);
    ctx.throw(418, error);
  }
  user.password = await bcrypt.hash(user.password, 10);
  const savedUser = await User.create(user);
  ctx.body = savedUser;
});

router.use(isAuth).get("/:id", async ctx => {
  const id = ctx.params.id;
  console.log(`GET user ${id}`);
  const user = await User.findById(id);
  ctx.body = user;
});

router.use(isAuth).put("/:id", async ctx => {
  const id = ctx.params.id;
  console.log(`PUT user ${id}`);
  const userId = getUserId(ctx.request);
  if (id !== userId) {
    const error = `you are not allowed to change another users info`;
    console.log(error);
    ctx.throw(401, error);
  }
  await User.update({ _id: id }, ctx.request.body);
  const user = await User.findById(id);
  ctx.body = user;
});
