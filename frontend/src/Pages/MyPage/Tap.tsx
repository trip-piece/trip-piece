import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { MdOutlineAddReaction } from "react-icons/md";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { pixelToRem } from "../../utils/functions/util";
import { colors, options } from "../../utils/interfaces/mypage.interface";
const TapBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1rem 1rem 1rem 1rem;
  padding: 0 0 ${pixelToRem(30)}0;
  margin: ${pixelToRem(15)};

  height: ${pixelToRem(55)};
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
  margin: 7px 0 10px 0;
`;

const TapButton = styled(motion.button)`
  background-color: transparent;
`;

function Tap({ type }: options) {
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
        <TapButton onClick={moveToSticker} whileHover={{ scale: 1.1 }}>
          <MdOutlineAddReaction size="40" color={colors[type][0]} />
        </TapButton>
      </LeftTap>
      <RightTap>
        <TapButton onClick={moveToScrap} whileHover={{ scale: 1.1 }}>
          <BsFillBookmarkHeartFill
            size="37"
            height="31"
            color={colors[type][1]}
          />
        </TapButton>
      </RightTap>
    </TapBox>
  );
}

export default Tap;
