import jwt from "koa-jwt";

export const isAuth = jwt({ secret: "super veilige key" });

export const getUserId = request => {
  const authHeader = request.header.authorization;
  const base64 = authHeader
    .split(" ")[1]
    .split(".")[1]
    .replace("-", "+")
    .replace("_", "/");
  const user = Buffer.from(base64, "base64").toString();
  return JSON.parse(user).id;
};
