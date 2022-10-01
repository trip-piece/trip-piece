/* eslint-disable import/no-extraneous-dependencies */
import { rest } from "msw";
import diaryApis from "../utils/apis/diaryApis";

const diaryList: object[] = [];

export const diaryHandlers = [
  rest.post(diaryApis.diaryWrite, (req, res, ctx) => {
    diaryList.push(req);
    return res(ctx.status(200), ctx.json({ diaryId: 123 }));
  }),
];
