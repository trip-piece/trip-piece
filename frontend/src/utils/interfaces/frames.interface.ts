export interface IFrame {
  frameId: number;
  image: string;
  scrapped: boolean;
  diaryId: number;
  stickerList: IDeco[];
}

export interface IDeco {
  id: number;
  stickerId: number;
  tokenId: number;
  tokenName: string;
  tokenURL: string;
  x: number;
  y: number;
}
