import styled from "@emotion/styled";
import React, { forwardRef, LegacyRef } from "react";

const Picture = styled.picture`
  display: flex;
  justify-content: center;
`;

const DiaryImg = styled.img`
  width: 100%;
`;

interface TodayPhotoProps {
  src: string;
  alt: string;
}

const TodayPhoto = forwardRef(
  ({ src, alt }: TodayPhotoProps, ref: LegacyRef<HTMLImageElement>) => {
    return (
      <Picture>
        <DiaryImg src={src} alt={alt} width="550" loading="lazy" ref={ref} />
      </Picture>
    );
  },
);

export default TodayPhoto;
