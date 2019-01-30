import Router from "koa-router";
import User from "../users/usersSchema";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const router = new Router();

router.post("/", async ctx => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  console.log(`POST /auth for ${email}`);
  const user = await User.findOne({ email });
  if (!user) {
    const error = `User not found`;
    console.log(error);
    ctx.throw(404, error);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    const error = "Password incorrect";
    console.log(error);
    ctx.throw(401, error);
  }
  const jwt = jsonwebtoken.sign({ id: user.id }, "super veilige key");
  ctx.body = { jwt };
});
