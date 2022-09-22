import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as EtherIcon } from "../../assets/svgs/etherIcon.svg";
import { ReactComponent as PencilIcon } from "../../assets/svgs/pencilIcon.svg";

const InfoBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: 0 0 ${pixelToRem(30)} ${pixelToRem(32)};
  margin: ${pixelToRem(15)};

  height: ${pixelToRem(121)};
  background: ${(props) => props.theme.colors.white};
  display: flex;
`;

const InfoContent = styled.div`
  padding: ${pixelToRem(30)} 0 0 0;
`;

const WalletBalance = styled.div`
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  padding: ${pixelToRem(9)} 0 0 0;
  position: relative;
`;
const WalletBalanceText = styled.text`
  margin: ${pixelToRem(6)} 0 0 ${pixelToRem(8)};
  position: absolute;
`;

const Name = styled.text`
  font-size: ${(props) => props.theme.fontSizes.h2};
  padding: 0 ${pixelToRem(7)} 0 0;
  font-weight: bold;
`;

const NameSuffix = styled.text`
  font-size: ${(props) => props.theme.fontSizes.h4};

  font-weight: bold;
`;

const ModifyNickNameButton = styled.button`
  float: right;
  margin: ${pixelToRem(11)} ${pixelToRem(18)} 0 0;
  background-color: transparent;
  height: ${pixelToRem(25)};
  margin-left: auto;
`;

function UserInfo() {
  return (
    <InfoBox>
      <InfoContent>
        <Name>유지연</Name>
        <NameSuffix>여행자님</NameSuffix>
        <WalletBalance>
          <EtherIcon />
          <WalletBalanceText>123.456</WalletBalanceText>
        </WalletBalance>
      </InfoContent>
      <ModifyNickNameButton>
        <PencilIcon width="25" />
      </ModifyNickNameButton>
    </InfoBox>
  );
}

export default UserInfo;
