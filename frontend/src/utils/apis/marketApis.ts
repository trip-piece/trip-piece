export const marketApis = {
    //일단 page parameter 뺐음
    marketList: (keyword: string | null | undefined, regionId: number | undefined, sort: number | undefined): string =>
    `/market?keyword=${keyword}&regionId=${regionId}&sort=${sort}`,
};