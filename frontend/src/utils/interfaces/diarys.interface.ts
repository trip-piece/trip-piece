export interface IDiary {
  tripId: number;
  content: string;
  fontType: number;
  backgroundColor: number;
  weather: number;
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
  tokenURI: string;
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
  stickerId: number;
  tokenId: number;
  tokenName: string;
  tokenURL: string;
  x: number;
  y: number;
}

export interface IRequestedDiary extends IDiary {
  date: string;
  diaryId: number;
  location: string;
  ratio: number;
  todayPhoto: string;
  stickerList: IRequestedSticker[];
}
