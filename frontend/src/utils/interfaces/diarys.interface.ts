export interface IDiary {
  tripId: number;
  content: string;
  fontType: number;
  backgroundColor: number;
  weather: number;
  imagePath?: string | null;
  diaryId?: number;
  id?: number;
  location?: string;
  ratio: number;
}

export interface IWritedDiary<T> {
  diary: IDiary;
  todayPhoto?: T;
}

export interface IDiaryListState<T> {
  [key: string]: IWritedDiary<T>;
}

export interface AccessIDiaryListState<T> {
  keyName: keyof IDiaryListState<T>;
}

export interface StickerProps {
  tokenId: number;
  imagePath: string;
}
export interface ISticker extends StickerProps {
  x: number;
  y: number;
  isDragging: boolean;
  originX: number;
  originY: number;
}

export interface IFrameImageObj {
  frameImage: File | null;
  frameImageBase64: string | null;
}

export interface IRequestedSticker {
  imagePath: string;
  stickerId: number;
  tokenId: number;
  tokenName: string;
  tokenURL: string;
  x: number;
  y: number;
}

export interface IRequestedDiary extends IDiary {
  todayPhoto: string;
  share: boolean;
  stickerList: IRequestedSticker[];
}

export interface IIPFSResult {
  0: string;
  1: string;
  tokenId: string;
  tokenURI: string;
}
