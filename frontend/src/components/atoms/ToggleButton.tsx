import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { pixelToRem } from "../../utils/functions/util";

const Background = styled.div`
  display: inline-block;
  width: 50%;
  height: ${pixelToRem(45)};
  border-radius: ${pixelToRem(20)};
  background-color: ${(props) => props.theme.colors.gray200};
  z-index: -10;
`;

const TextBox = styled.div`
  position: relative;
  width: 100%;
  height: ${pixelToRem(45)};
  line-height: ${pixelToRem(45)};
  top: -100%;
  display: flex;
  justify-content: space-around;
  z-index: 10;
  > Box {
    > div {
      color: ${(props) => props.theme.colors.gray0};
    }
  }
`;

export default function ToggleButton(props: {
  onClickLeft: () => void;
  onClickRight: () => void;
  textLeft:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  textRight:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const [toggle, setToggle] = React.useState("off");

  function onClickLeft() {
    if (props && props.onClickLeft) props.onClickLeft();
    setToggle("off");
  }
  function onClickRight() {
    if (props && props.onClickRight) props.onClickRight();
    setToggle("on");
  }

  return (
    <Background>
      <TextBox>
        <Box onClick={onClickLeft}>
          <p>{props.textLeft}</p>
        </Box>
        <Box onClick={onClickRight}>
          <div>{props.textRight}</div>
        </Box>
      </TextBox>
    </Background>
  );
}
