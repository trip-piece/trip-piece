// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

const data = {
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  last: true,
};

export const handlers = [
  // 할일 목록
  rest.get("/trip", (req, res, ctx) => {
    console.log("res", req.url.search);
    if (req.url.search === "?page=5")
      return res(ctx.status(200), ctx.json({ ...data, last: false }));
    return res(ctx.status(200), ctx.json(data));
  }),
];
