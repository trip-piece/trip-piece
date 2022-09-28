// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";

const data = {
  scrapList: [
    {
      scrapId: 11,
      diaryId: 12,
      frameId: 13,
      image: "이미지 경로오",
    },
    {
      scrapId: 12,
      diaryId: 13,
      frameId: 14,
      image: "이미지 경로오",
    },
    {
      scrapId: 13,
      diaryId: 14,
      frameId: 15,
      image: "이미지 경로오",
    },
    {
      scrapId: 14,
      diaryId: 15,
      frameId: 16,
      image: "이미지 경로오",
    },
    {
      scrapId: 15,
      diaryId: 16,
      frameId: 17,
      image: "이미지 경로오",
    },
    {
      scrapId: 16,
      diaryId: 17,
      frameId: 18,
      image: "이미지 경로오",
    },
    {
      scrapId: 17,
      diaryId: 18,
      frameId: 19,
      image: "이미지 경로오",
    },
    {
      scrapId: 18,
      diaryId: 19,
      frameId: 20,
      image: "이미지 경로오",
    },
    {
      scrapId: 19,
      diaryId: 20,
      frameId: 21,
      image: "이미지 경로오",
    },
    {
      scrapId: 20,
      diaryId: 21,
      frameId: 22,
      image: "이미지 경로오",
    },
    {
      scrapId: 21,
      diaryId: 22,
      frameId: 23,
      image: "이미지 경로오",
    },
    {
      scrapId: 22,
      diaryId: 23,
      frameId: 24,
      image: "이미지 경로오",
    },
  ],
  last: true,
};

export const scrapHandlers = [
  rest.get("/user/scraps", (req, res, ctx) => {
    if (req.url.search === "?page=5")
      return res(ctx.status(200), ctx.json({ ...data, last: false }));
    return res(ctx.status(200), ctx.json(data));
  }),
];
