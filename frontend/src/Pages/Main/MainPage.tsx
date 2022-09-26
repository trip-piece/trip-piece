import styled from "@emotion/styled";
import { ReactComponent as StarIcon } from "../../assets/svgs/starplus.svg";

const MainBox = styled.div`
  height: 50%;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 0 0 1.25rem 1.25rem;
  padding: 30px 0 30px 0;
  background: ${(props) => props.theme.colors.mainGradient};
  display: flex;
  justify-content: center;
`;

const MiddleTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h5};
  letter-spacing: -2px;
`;

const InsideLeftBox = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 10px;
  border-top-style: solid;
  border-right-style: dashed;
  border-bottom-style: solid;
  border-left-style: solid;
  border-style: solid dashed solid solid;
  border-width: 0.188rem;
  border-color: ${(props) => props.theme.colors.gray300};
  border-radius: 1.25rem 0 0 1.25rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InsideRightBox = styled.div`
  width: 50%;
  height: 100%;
  margin-right: 10px;
  border-style: solid solid solid hidden;
  border-width: 0.188rem;
  border-color: ${(props) => props.theme.colors.gray300};
  border-radius: 0 1.25rem 1.25rem 0;
  text-align: center;
`;

const InsideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 70%;
  width: 100%;
  color: ${(props) => props.theme.colors.gray300};
`;

const InnerTextTitle = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
`;

const InnerTextBody = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s2};
`;

const MiddleTitlePosition = styled.div`
  margin: 1.25rem;
  background-color: ${(props) => props.theme.colors.white};
  text-align: center;
`;

const FooterText = styled.div`
  color: #434343;
  font-size: ${(props) => props.theme.fontSizes.s2};
  letter-spacing: 1px;
`;

// NFT 알려주는 박스 - 추후 위치 기반으로 돌려서 여러개 자동 생성되도록 함
const GetStickerBox = styled.div`
  width: 201px;
  height: 238px;
  background-color: ${(props) => props.theme.colors.gray200};
  border-radius: 0.938rem;
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  margin: 0.938rem;
`;

const BoxContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 100vh;
`;

function MainPage() {
  return (
    <BoxContainer>
      <MainBox>
        <InsideLeftBox>
          <InsideContent>
            <InnerTextTitle>현재 진행 중인 여행</InnerTextTitle>
            <StarIcon width="77" height="77" fill="#d4d4d4" />
            <InnerTextBody>
              현재 진행중인 여행이 없습니다. <br />
              여행을 등록해주세요.
            </InnerTextBody>
          </InsideContent>
        </InsideLeftBox>
        <InsideRightBox>
          <InsideContent>티켓 이미지 들어갈 공간</InsideContent>
        </InsideRightBox>
      </MainBox>
      <MiddleTitlePosition>
        <MiddleTitle>
          📍 현재 이 곳에서 스티커를 발급받을 수 있어요!
        </MiddleTitle>
      </MiddleTitlePosition>
      <GetStickerBox />
      <MiddleTitlePosition>
        <FooterText>Copyright ⓒ2022 여행조각 All rights reserved.</FooterText>
      </MiddleTitlePosition>
    </BoxContainer>
  );
}

export default MainPage;
