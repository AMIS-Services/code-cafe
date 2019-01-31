import Router from "koa-router";
import Accommodation from "./accommodationsSchema";
import { isAuth, getUserId } from "../auth/helpers";

export const router = new Router();

router.get("/", async ctx => {
  console.log("GET /accommodations");
  const accommodations = await Accommodation.find();

  const accommodationsOverview = accommodations.map(a => ({
    _id: a._id,
    location: a.location,
    name: a.name,
    description: a.description,
    image: a.images[0]
  }));
  ctx.body = accommodationsOverview;
});

router.get("/:id", async ctx => {
  const id = ctx.params.id;
  console.log(`GET /accommodations/${id}`);
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    ctx.throw(404);
  }
  const accommodation = await Accommodation.findById(id);
  ctx.body = accommodation;
});

router.use(isAuth).post("/", async ctx => {
  console.log("POST /accommodations");
  const accommodation = ctx.request.body;
  const userId = getUserId(ctx.request);
  accommodation.createdBy = userId;
  const savedAccommodation = await Accommodation.create(accommodation);
  ctx.body = savedAccommodation;
});

router.use(isAuth).put("/:id", async ctx => {
  const id = ctx.params.id;
  console.log(`PUT /accommodations/${id}`);
  await Accommodation.update({ _id: id }, ctx.request.body);
  const accommodation = await Accommodation.findById(id);
  ctx.body = accommodation;
});
