export const frameApis = {
  getSharedFrames: (regionList: number[]): string =>
    `/frames?regionList=${regionList}`,

  getSharedFramesCount: "/frames/counts",
  getDetailedFrames: (frameId: number): string => `frames/${frameId}`,
  saveFrame: "/frames",
  deleteSharedFrame: "/frames",
  deleteScrappedFrame: "/frames/scrap",
};
