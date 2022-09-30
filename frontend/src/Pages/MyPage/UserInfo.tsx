import React from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as EtherIcon } from "../../assets/svgs/etherIcon.svg";
import NestedModal from "./Modal";
import { UserInfoState } from "../../store/atom";
import { CodeProps } from "../../utils/interfaces/qrscan.inteface";

const InfoBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
  padding: 0 0 ${pixelToRem(30)} ${pixelToRem(32)};
  margin: ${pixelToRem(15)};

  height: auto;
  background: ${(props) => props.theme.colors.white};
  display: flex;
`;

const InfoContent = styled.div`
  padding: ${pixelToRem(30)} 0 0 0;
`;
const ContentTop = styled.div`
  display: flex;
  position: relative;
`;

const ContentBottom = styled.div`
  display: flex;
  position: absolute;
`;

const WalletBalance = styled.div`
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  padding: ${pixelToRem(9)} 0 0 0;
  display: flex;
  float: bottom;
`;
const WalletBalanceText = styled.div`
  margin: 3% 0 0 5%;
`;

const Name = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h2};
  padding: 0 ${pixelToRem(7)} 0 0;
  margin-top: auto;

  margin-top: auto;
  text-align: justify;
  display: flex;
`;

const NameSuffix = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h6};

  display: inline-block;
  white-space: nowrap;
  margin-top: auto;
  font-weight: bold;
`;
const IdCode = styled.div`
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  margin-top: auto;
  font-weight: bold;
  width: auto;
`;

const ModifyNickNameButton = styled.div`
  float: right;
  margin: ${pixelToRem(11)} 0 0 0;

  background-color: transparent;
  height: ${pixelToRem(25)};
  margin-left: auto;
`;

function IdCodeComponent({ id }: CodeProps) {
  const num: string = id.toString();
  let code: ReactJSXElement;
  if (num.length === 1) {
    code = <IdCode>#000{id}</IdCode>;
  } else if (num.length === 2) {
    code = <IdCode>#00{id}</IdCode>;
  } else if (num.length === 3) {
    code = <IdCode>#0{id}</IdCode>;
  } else code = <IdCode>#{id}</IdCode>;

  return code;
}

function UserInfo() {
  const [userInfoState] = useRecoilState(UserInfoState);

  return (
    <InfoBox>
      <InfoContent>
        <ContentTop>
          <Name>{userInfoState.nickname}</Name>
          <NameSuffix>여행자님</NameSuffix>
          <IdCodeComponent id={userInfoState.id} />
        </ContentTop>

        <WalletBalance>
          <EtherIcon />
          <WalletBalanceText>{userInfoState.balance}</WalletBalanceText>
        </WalletBalance>
      </InfoContent>

      <ModifyNickNameButton>
        <NestedModal />
      </ModifyNickNameButton>
    </InfoBox>
  );
}

export default UserInfo;
