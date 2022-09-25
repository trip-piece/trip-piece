export interface TitleProps {
  title: string;
  location: string;
}

export interface ContentProps {
  result: "success" | "fail" | "incorrect";
  stickerName?: string | null;
  stickerUrl?: string | null;
}
