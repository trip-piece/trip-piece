export const frameApis = {
  getSharedFrames: (regionList: number[], page: number): string =>
    `/frames?regionList=${regionList}&page=${page}`,

  getSharedFramesCount: "/frames/counts",
  getDetailedFrames: (frameId: number): string => `/frames/${frameId}`,
  saveFrame: "/frames",
  deleteSharedFrame: "/frames",
  deleteScrappedFrame: "/frames/scrap",
};
