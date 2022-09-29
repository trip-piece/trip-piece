const diaryApis = {
  diary: (tripId: number | undefined, date: string | undefined) =>
    `/diary?tripId=${tripId}&date=${date}`,
  diaryWrite: "/diary/write",
  diaryDecoration: "/diary/decoration",
};

export default diaryApis;
