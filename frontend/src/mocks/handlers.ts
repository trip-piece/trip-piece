// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

const data = {
  tripList: [
    {
      tripId: 123,
      regionId: 1,
      title: "간장공장장",
      startDate: "2022-09-15",
      endDate: "2022-09-28",
    },
    {
      tripId: 123,
      regionId: 1,
      title: "간장공장장",
      startDate: "2022-09-15",
      endDate: "2022-09-28",
    },
    {
      tripId: 123,
      regionId: 1,
      title: "간장공장장",
      startDate: "2022-09-15",
      endDate: "2022-09-28",
    },
    {
      tripId: 123,
      regionId: 1,
      title: "간장공장장",
      startDate: "2022-09-15",
      endDate: "2022-09-28",
    },
  ],
  last: true,
};

export const handlers = [
  /** 여행 리스트 불러오기 */
  rest.get("/trip", (req, res, ctx) => {
    if (req.url.search === "?page=5")
      return res(ctx.status(200), ctx.json({ ...data, last: false }));
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.post("/trip", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch(`/trip/123`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`/trip/123`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];