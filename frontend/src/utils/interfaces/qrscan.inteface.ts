export interface TitleProps {
  title: string;
}

export interface ContentProps {
  result: string;
  stickerName?: string | null;
  stickerUrl?: string | null;
}

export interface CodeProps {
  id: number;
}
interface test {
  content: CodeProps[];
}

export const contentPropsInit: ContentProps = {
  result: "fuck",
  stickerName: null,
  stickerUrl: null,
};
