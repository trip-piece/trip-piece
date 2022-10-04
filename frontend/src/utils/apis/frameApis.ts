export const frameApis = {
  getSharedFrames: (regionList: number[]): string => {
    let api: string = "";
    let str: string = "";
    const { length } = regionList;
    if (length === 0) {
      api = `/frames?regionList=`;
    } else {
      regionList.forEach(function (region, idx) {
        str += region.toString();
        str += ",";
      });

      str = str.substring(0, str.length - 1);

      api = `/frames?regionList=${str}`;
    }

    return api;
  },

  getSharedFramesCount: "/frames/counts",
  getDetailedFrames: (frameId: number): string => `/frames/${frameId}`,
  saveFrame: "/frames",
  deleteSharedFrame: "/frames",
  deleteScrappedFrame: "/frames/scrap",
};
