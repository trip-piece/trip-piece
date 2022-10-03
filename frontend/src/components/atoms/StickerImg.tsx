import styled from "@emotion/styled";
import React from "react";

const Img = styled.img<{ up: number; left: number }>`
  top: ${(props) => `${props.up}px`};
  left: ${(props) => `${props.left}px`};
  width: 20%;
  position: absolute;
`;

interface StickerImgProps {
  up: number;
  left: number;
  src: string;
  alt: string;
}

function StickerImg({ up, left, src, alt }: StickerImgProps) {
  return <Img up={up} left={left} src={src} alt={alt} />;
}

export default StickerImg;
