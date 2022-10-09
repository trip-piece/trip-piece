import styled from "@emotion/styled";
import React, { forwardRef, LegacyRef } from "react";
import { pixelToRem } from "../../utils/functions/util";

const Picture = styled.picture<{ diaryWidth: number }>`
  display: flex;
  justify-content: center;
  padding: ${(props) => `${pixelToRem(16 + (props.diaryWidth - 320) / 20)}`};
  padding-top: 0;
`;

const DiaryImg = styled.img`
  width: 100%;
`;

interface TodayPhotoProps {
  src: string;
  alt: string;
  diaryWidth: number;
}

const TodayPhoto = forwardRef(
  (
    { src, alt, diaryWidth }: TodayPhotoProps,
    ref: LegacyRef<HTMLImageElement>,
  ) => {
    return (
      <Picture diaryWidth={diaryWidth}>
        <DiaryImg src={src} alt={alt} width="550" loading="lazy" ref={ref} />
      </Picture>
    );
  },
);

export default TodayPhoto;
