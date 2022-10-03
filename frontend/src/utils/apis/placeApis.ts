export const placeApis = {
  place: "/places",
  getPlaces: (regionId: number, type: number) =>
    `places?regionId=${regionId}&type=${type}`,
  getLocationPlaces: (lat: number, lng: number): string =>
    `places/mylocation?lat=${lat}&lng=${lng}`,
  getDetailedPlace: (placeId: string): string => `places/${placeId}`,
};
