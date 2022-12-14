// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

const data = {
  content: [
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
      startDate: "2022-10-06",
      endDate: "2022-10-15",
    },
    {
      tripId: 145,
      regionId: 3,
      title: "간장공장장3",
      startDate: "2022-10-16",
      endDate: "2022-10-21",
    },
    {
      tripId: 156,
      regionId: 4,
      title: "간장공장장4",
      startDate: "2022-10-22",
      endDate: "2023-01-05",
    },
    {
      tripId: 1,
      regionId: 5,
      title: "간장공장장1",
      startDate: "2022-09-20",
      endDate: "2022-10-05",
    },
    {
      tripId: 2,
      regionId: 6,
      title: "간장공장장2",
      startDate: "2022-10-06",
      endDate: "2022-10-15",
    },
    {
      tripId: 3,
      regionId: 7,
      title: "간장공장장3",
      startDate: "2022-10-16",
      endDate: "2022-10-21",
    },
    {
      tripId: 5,
      regionId: 8,
      title: "간장공장장4",
      startDate: "2022-10-22",
      endDate: "2023-01-05",
    },
  ],
  last: false,
};

export const handlers = [
  /** 여행 리스트 불러오기 */
  rest.get("/trip", (req, res, ctx) => {
    if (req.url.search === "?page=5")
      return res(ctx.status(200), ctx.json({ ...data, last: true }));
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
  rest.get(`/trip/123/detail`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tripId: 123,
        regionId: 1,
        title: "간장공장장1",
        startDate: "2022-09-15",
        endDate: "2022-10-20",
      }),
    );
  }),
];
