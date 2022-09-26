export interface TitleProps {
  title: string;
  location: string;
}

export interface ContentProps {
  result: "success" | "fail" | "incorrect" | string;
  stickerName?: string | null;
  stickerUrl?: string | null;
}
