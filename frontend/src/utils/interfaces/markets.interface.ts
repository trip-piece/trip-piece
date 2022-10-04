export interface IMarket {
  marketId: number;
  price: number;
  stickerId: number;
  tokenId: number;
  tokenName: string;
  tokenURL: string;
  userId: number;
}

export interface saveRequest {
  tokenId: number;
  price: number;
}

export interface deleteRequest {
  data: {
    marketId: number;
  };
}

export interface MarketStikcerListResponse {
  content: Array<IMarket>;
}

export interface RouteState {
  state: null | IMarket;
}
