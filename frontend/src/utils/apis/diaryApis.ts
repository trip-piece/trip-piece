const diaryApis = {
  targetDiary: (tripId: number | undefined, date: string | undefined) =>
    `/diary?tripId=${tripId}&date=${date}`,
  diaryWrite: "/diary/write",
  diaryDecoration: "/diary/decoration",
  diary: "/diary",
  diaryEdit: "/diary/edit",
};

export default diaryApis;
