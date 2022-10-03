import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const Button = styled.button`
  border-radius: ${pixelToRem(20)};
  background: ${(props) => props.theme.colors.yellow};
  font-weight: bold;
  cursor: pointer;

  /* 크기 */
  width: ${pixelToRem(117)};
  height: ${pixelToRem(38)};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-color: white;
`;

function ToTheTop() {
  // 토글 여부를 결정하는 state 선언
  const [toggleBtn, setToggleBtn] = useState(true);

  // window 객체에서 scrollY 값을 받아옴
  // 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정
  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 토글 여부 state에 따라 버튼을 보여주거나 감추게 만듦
  return toggleBtn ? (
    <div style={{ padding: "5vh" }}>
      <Button type="button" onClick={goToTop}>
        여행가기
      </Button>
    </div>
  ) : null;
}

export default ToTheTop;
