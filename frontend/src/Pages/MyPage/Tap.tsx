import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as BookMarkIcon } from "../../assets/svgs/bookmarkIcon.svg";
import { ReactComponent as StickerIcon } from "../../assets/svgs/stickerIcon.svg";
import { pixelToRem } from "../../utils/functions/util";
import { Link, useNavigate } from "react-router-dom";

const TapBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1rem 1rem 1rem 1rem;
  padding: 0 0 ${pixelToRem(30)}0;
  margin: ${pixelToRem(15)};

  height: ${pixelToRem(45)};
  background: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
`;

const LeftTap = styled.div`
  border-right: solid 1px ${(props) => props.theme.colors.gray400};
  padding: 0 18% 0 0;
  margin: 7px 0 8px 0;
`;
const RightTap = styled.div`
  padding: 0 0 0 18%;
  margin: 6px 0 10px 0;
`;

const TapButton = styled.button`
  background-color: transparent;
`;

function Tap() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const moveToSticker = () => {
    navigate("/user/stickers");
    setOpen(false);
  };

  const moveToScrap = () => {
    navigate("/user/scraps");
    setOpen(false);
  };

  return (
    <TapBox>
      <LeftTap>
        <TapButton onClick={moveToSticker}>
          <StickerIcon width="32" height="32" />
        </TapButton>
      </LeftTap>
      <RightTap>
        <TapButton onClick={moveToScrap}>
          <BookMarkIcon width="31" height="31" />
        </TapButton>
      </RightTap>
    </TapBox>
  );
}

export default Tap;
