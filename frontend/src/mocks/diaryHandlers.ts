/* eslint-disable import/no-extraneous-dependencies */
import { rest } from "msw";
import diaryApis from "../utils/apis/diaryApis";

export const diaryHandlers = [
  rest.post(diaryApis.diaryWrite, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ diaryId: 123 }));
  }),
  rest.post(diaryApis.diaryDecoration, (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json({ message: "good" }));
  }),
];
