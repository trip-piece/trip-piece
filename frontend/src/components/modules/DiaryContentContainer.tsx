import styled from "@emotion/styled";
import { forwardRef, LegacyRef } from "react";
import { DIARY_COLOR_LIST, FONTTYPELIST } from "../../utils/constants/constant";
import { pixelToRem } from "../../utils/functions/util";
import { IChildren } from "../../utils/interfaces/common.interface";

const DiaryContents = styled.div<DiaryContentsProps>`
  position: relative;
  white-space: pre-line;
  min-height: 60vh;
  width: 100%;
  background-color: ${(props) => DIARY_COLOR_LIST[props.backgroundColor]};
  font-family: ${(props) => FONTTYPELIST[props.fontType]};
  padding: ${(props) => `${pixelToRem(16 + (props.diaryWidth - 320) / 20)}`};
  resize: none;
  transition: background-color 0.5s ease-in;
  font-size: ${(props) => pixelToRem(props.diaryWidth / 20)};
`;

interface DiaryContentsProps {
  fontType: number;
  diaryWidth: number;
  backgroundColor: number;
}

interface IDiaryContent extends IChildren, DiaryContentsProps {}

const DiaryContentContainer = forwardRef(
  (
    { children, fontType, diaryWidth, backgroundColor }: IDiaryContent,
    ref?: LegacyRef<HTMLDivElement>,
  ) => {
    return (
      <DiaryContents
        fontType={fontType}
        diaryWidth={diaryWidth}
        backgroundColor={backgroundColor}
        ref={ref}
      >
        {children}
      </DiaryContents>
    );
  },
);
export default DiaryContentContainer;
