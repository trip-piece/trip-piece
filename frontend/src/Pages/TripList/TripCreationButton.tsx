import React from "react";
import { ReactComponent as StarIcon } from "../../assets/svgs/starplus.svg";
import TransparentRoundButton from "../../components/atoms/TransparentRoundButton";
import { themes } from "../../style/theme";

interface TripCreationButtonProps {
  func: () => void;
}

function TripCreationButton({ func }: TripCreationButtonProps) {
  return (
    <TransparentRoundButton type="button" func={func}>
      <StarIcon width="75" height="75" fill={themes.colors.mainDark} />
    </TransparentRoundButton>
  );
}

export default TripCreationButton;
