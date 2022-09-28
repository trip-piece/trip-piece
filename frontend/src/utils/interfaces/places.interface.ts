export interface IPlace {
  placeId: number;
  name: string;
  regionId: number;
  locationAddress: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  type: number;
  amount: number;
  stickerList: ISticker[];
  posterImage: string;
}

export interface ISticker {
  stickerId: number;
  tokenId: number;
  tokenName: string;
  tokenURL: string;
}
