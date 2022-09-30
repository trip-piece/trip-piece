/* eslint-disable import/no-extraneous-dependencies */
import { rest } from "msw";
import diaryApis from "../utils/apis/diaryApis";

const diary = {
  backgroundColor: 2,
  diaryId: 123,
  content:
    "그러나 시간이 지나도\n아물지 않는 일들이 있지\n내가 날 온전히 사랑하지 못해서\n맘이 가난한 밤이야\n거울 속에 마주친 얼굴이 어색해서\n습관처럼 조용히 눈을 감아\n밤이 되면 서둘러 내일로 가고 싶어\n수많은 소원 아래 매일 다른 꿈을 꾸던\n아이는 그렇게 오랜 시간\n겨우 내가 되려고 아팠던 걸까\n쌓이는 하루만큼 더 멀어져\n우리는 화해할 수 없을 것 같아\n나아지지 않을 것 같아\n어린 날 내 맘엔 영원히\n가물지 않는 바다가 있었지\n이제는 흔적만이 남아 희미한 그곳엔",
  date: "2022-09-30",
  fontType: 1,
  location: "서울특별시 송파구 송파1동",
  ratio: 1.53,
  tripId: 123,
  weather: 1,
  todayPhoto:
    "https://dispatch.cdnser.be/wp-content/uploads/2018/09/6bd7239ca6cb68d21626573a39c57653.jpg",
  stickerList: [
    {
      stickerId: 2,
      tokenId: 2,
      x: 0.008753255208333333,
      y: 0.7148475294520454,
      tokenName: "smile",
      tokenURL:
        "https://cdn.pixabay.com/photo/2016/08/21/18/48/emoticon-1610518_960_720.png",
    },
    {
      stickerId: 3,
      tokenId: 3,
      x: 0.5622232259114583,
      y: 0.6833699638535335,
      tokenName: "smile",
      tokenURL:
        "https://cdn.pixabay.com/photo/2016/09/10/14/54/emoticon-1659235_960_720.png",
    },
  ],
};

const diaryData = {
  diary: {
    backgroundColor: 2,
    content:
      "그러나 시간이 지나도\n아물지 않는 일들이 있지\n내가 날 온전히 사랑하지 못해서\n맘이 가난한 밤이야\n거울 속에 마주친 얼굴이 어색해서\n습관처럼 조용히 눈을 감아\n밤이 되면 서둘러 내일로 가고 싶어\n수많은 소원 아래 매일 다른 꿈을 꾸던\n아이는 그렇게 오랜 시간\n겨우 내가 되려고 아팠던 걸까\n쌓이는 하루만큼 더 멀어져\n우리는 화해할 수 없을 것 같아\n나아지지 않을 것 같아\n어린 날 내 맘엔 영원히\n가물지 않는 바다가 있었지\n이제는 흔적만이 남아 희미한 그곳엔",
    date: "2022-09-30",
    fontType: 1,
    location: "서울특별시 송파구 송파1동",
    tripId: 123,
    weather: 1,
  },
  todayPhoto:
    "https://dispatch.cdnser.be/wp-content/uploads/2018/09/6bd7239ca6cb68d21626573a39c57653.jpg",
};

const decorationData = {
  decoration: {
    diaryId: 123,
    stickerList: [
      {
        tokenId: 2,
        x: 0.01090909090909091,
        y: 0.7111903965510834,
      },
      {
        tokenId: 3,
        x: 0.5490909090909091,
        y: 0.6731333853644034,
      },
    ],
  },
  frameImage: {},
};

export const diaryHandlers = [
  rest.post(diaryApis.diaryWrite, (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json({ diaryId: 123 }));
  }),
  rest.post(diaryApis.diaryDecoration, (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json({ message: "good" }));
  }),
  // rest.get(diaryApis.diary(123, "2022-09-30"), (req, res, ctx) => {
  //   return res(ctx.status(200), ctx.json(diary));
  // }),
  rest.get("/diary?tripId=123&date=2022-09-30", (req, res, ctx) => {
    console.log(
      req.url.href === "http://localhost:3000/diary?tripId=123&date=2022-09-30",
    );
    if (
      req.url.href === "http://localhost:3000/diary?tripId=123&date=2022-09-30"
    ) {
      return res(ctx.status(200), ctx.json(diary));
    }
    return res(ctx.status(400));
  }),
];
