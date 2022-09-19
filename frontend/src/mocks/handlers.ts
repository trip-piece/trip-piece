// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

const data = {
  tripList: [
    {
      tripId: 123,
      regionId: 1,
      title: "간장공장장1",
      startDate: "2022-09-20",
      endDate: "2022-10-05",
    },
    {
      tripId: 134,
      regionId: 2,
      title: "간장공장장2",
      startDate: "2022-09-15",
      endDate: "2022-10-05",
    },
    {
      tripId: 145,
      regionId: 3,
      title: "간장공장장3",
      startDate: "2022-09-15",
      endDate: "2022-10-05",
    },
    {
      tripId: 156,
      regionId: 4,
      title: "간장공장장4",
      startDate: "2022-09-15",
      endDate: "2022-10-05",
    },
  ],
  last: true,
};

export const handlers = [
  /** 여행 리스트 불러오기 */
  rest.get("/api/trip", (req, res, ctx) => {
    if (req.url.search === "?page=5")
      return res(ctx.status(200), ctx.json({ ...data, last: false }));
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.post("/api/trip", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch(`/api/trip/123`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`/api/trip/123`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`/api/trip/123`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tripId: 123,
        regionId: 1,
        title: "간장공장장1",
        startDate: "2022-09-15",
        endDate: "2022-09-28",
      }),
    );
  }),
];
