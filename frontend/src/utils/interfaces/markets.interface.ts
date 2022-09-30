export interface IMarket {
  marketId: number;
  stickerId: number;
  tokenId: number;
  tokenName: string;
  tokenURL: string;
  userId: number;
  price: number;
}

export interface getStickerList {
  marketStickerList: Array<IMarket>;
}

export interface RouteState {
  state: null | IMarket;
}
