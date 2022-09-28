export const placeApis = {
  getPlaces: (regionId: number, type: number, page: number): string =>
    `/places?regionId=${regionId}&type=${type}&page=${page}`,
  getLocationPlaces: (lat: number, lng: number): string =>
    `places/lat=${lat}&lng=${lng}`,
  getDetailedPlace: (placeId: number): string => `places/{placeId}`,
};
