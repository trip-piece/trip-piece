import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "../../utils/apis/api";
import { frameApis } from "../../utils/apis/frameApis";

const Container = styled.article`
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  width: inherit;
`;

const StickerCard = styled.article`
  height: 100%;
  background: transparent;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: contain;
  }

  p {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.gray700};
    font-weight: bold;
  }
`;

const BackSpaceBtn = styled.button`
  width: auto;
  height: auto;
  background-color: transparent;
  margin: 0 0 2% 3%;
  color: ${(props) => props.theme.colors.gray800};
`;

const ScrapBtn = styled.button`
  width: auto;
  height: auto;
  background-color: transparent;
  margin: 2% 0 2% 3%;
  margin-left: auto;
  color: ${(props) => props.theme.colors.red};
`;

const ScarpContainer = styled.div`
  width: auto;
  height: auto;
  background-color: red;
  display: flex;
`;

const TagContainer = styled.div`
  width: auto;
  height: auto;
  background-color: blue;
  padding: 5%;
`;

const HashtagButton = styled.button`
  border-radius: 15px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: bold;
  background: ${(props) => props.theme.colors.yellow};
  margin: 0 1% 0 1%;
`;

const Button = styled.article`
  width: 100%;
  height: 10vh;
  padding: 1rem;
  display: flex;
  flex-direction: row;

  button {
    height: 5vh;
    border-radius: 15px;
    padding: 0 0.25rem 0 0.25rem;
    font-size: ${(props) => props.theme.fontSizes.h6};
    font-weight: bold;
    background: ${(props) => props.theme.colors.yellow};
    margin: 0 2% 0 2%;

    justify-content: center;
    align-items: center;
    vertical-align: center;
  }
`;

interface Idata {
  frameId: number;
  stickerList: [
    {
      stickerId: number;
      tokenId: number;
      tokenName: string;
      tokenURL: string;
      x: number;
      y: number;
    },
  ];
  scrapped: boolean;
}

function FrameDetailPage() {
  const navigate = useNavigate();
  const { frameId } = useParams();
  const [frame, setFrame] = useState<Idata>();
  const [scrap, setScrap] = useState<boolean>();

  const moveToFrameMain = () => {
    navigate(`/frames`);
  };

  const getFrameDetail = () => {
    axiosInstance
      .get(frameApis.getDetailedFrames(Number(frameId)))
      .then((response) => {
        const body: Idata = response.data;
        setFrame(body);
        setScrap(body.scrapped);
      });
  };

  const dummyImage: string =
    "https://trippiece607.s3.ap-northeast-2.amazonaws.com/20220802150807-%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A1%E1%86%BC%E1%84%87%E1%85%AE%E1%86%AF%E1%84%87%E1%85%B5%E1%86%BE%E1%84%8B%E1%85%A3%E1%84%89%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%BC.jpeg";

  const postSaveFrame = () => {
    const body = {
      frameId,
    };
    axiosInstance.post(frameApis.saveFrame, body);
  };

  const deleteScrappedFrame = () => {
    const body = {
      frameId,
    };
    axiosInstance.delete(frameApis.deleteScrappedFrame, { data: body });
  };

  const changeScrap = () => {
    if (scrap === false) {
      // 스크랩 설정하는 api 요청
      postSaveFrame();
    } else {
      // 스크랩 해제하는 api 요청
      deleteScrappedFrame();
    }
    setScrap(!scrap);
  };

  useEffect(() => {
    console.log("맨 처음 렌더링될 때 한 번만 실행");
    getFrameDetail();
  }, []);
  return (
    <>
      <Helmet>
        <title>마켓 | 프레임 상세 조회</title>
      </Helmet>
      <Container>
        <BackSpaceBtn onClick={moveToFrameMain}>
          <FaArrowLeft size={30} />
        </BackSpaceBtn>

        <StickerCard>
          <img src={dummyImage} alt="기본이미지" />
        </StickerCard>
        <ScarpContainer>
          <ScrapBtn onClick={changeScrap}>
            {scrap ? (
              <BsFillBookmarkHeartFill size={40} />
            ) : (
              <BsBookmarkHeart size={40} />
            )}
          </ScrapBtn>
        </ScarpContainer>
        <TagContainer>
          {frame.stickerList.map((sticker, idx) => {
            sticker.tokenName;
          })}
          <HashtagButton>버튼</HashtagButton>
          <HashtagButton>버튼</HashtagButton>
          <HashtagButton>버튼</HashtagButton>
          <HashtagButton>버튼</HashtagButton>
          <HashtagButton>버튼</HashtagButton>
        </TagContainer>
      </Container>
    </>
  );
}

export default FrameDetailPage;
// const result = {
//   frameImage:
//     "https://trippiece607.s3.ap-northeast-2.amazonaws.com/20220802150807-%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A1%E1%86%BC%E1%84%87%E1%85%AE%E1%86%AF%E1%84%87%E1%85%B5%E1%86%BE%E1%84%8B%E1%85%A3%E1%84%89%E1%85%B5%E1%84%8C%E1%85%A1%E1%86%BC.jpeg",
//   scrapped: true,
//   stickerList: [
//     {
//       stickerId: 1,
//       tokenId: 1,
//       tokenName: "이이",
//       tokenURL:
//         "https://www.infura-ipfs.io/ipfs/QmcqJiEjJon38JNzbsdgKhLBsjfWF8tZiUT5Mi7GQbtGP4",
//       x: 3.1234,
//       y: 5.123,
//     },
//     {
//       stickerId: 1,
//       tokenId: 1,
//       tokenName: "이이2",
//       tokenURL:
//         "https://www.infura-ipfs.io/ipfs/QmcqJiEjJon38JNzbsdgKhLBsjfWF8tZiUT5Mi7GQbtGP4",
//       x: 3.1234,
//       y: 5.123,
//     },
//     {
//       stickerId: 1,
//       tokenId: 1,
//       tokenName: "이이3",
//       tokenURL:
//         "https://www.infura-ipfs.io/ipfs/QmcqJiEjJon38JNzbsdgKhLBsjfWF8tZiUT5Mi7GQbtGP4",
//       x: 3.1234,
//       y: 5.123,
//     },
//   ],
// };
// {
//   /* <Button>
//             {result.stickerList.map((sticker, idx) => (
//               <button type="button">
//                 <p>#{sticker.tokenName}</p>
//               </button>
//             ))}
//           </Button> */
// }
