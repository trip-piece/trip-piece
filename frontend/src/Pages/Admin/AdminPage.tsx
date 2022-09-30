import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import {
  changeDateFormatToHyphen,
  pixelToRem,
} from "../../utils/functions/util";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/DatePicker.css";
import { NFTContract } from "../../utils/common/NFT_ABI";
import { SubmitHandler, useForm } from "react-hook-form";
import { REGIONLIST } from "../../utils/constants/constant";
import axiosInstance from "../../utils/apis/api";
import { placeApis } from "../../utils/apis/placeApis";

const Container = styled.section`
  min-height: 90vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  input {
    color: ${(props) => props.theme.colors.gray900};
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
`;

const TitleInput = styled.input`
  border: none;
  width: 100%;
  height: ${pixelToRem(40)};
  padding: 0 1rem;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.gray900};
`;

const InfoBox = styled.div`
  box-shadow: 0 4px 4px 2px rgb(0 0 0/25%);
  border-radius: 5px;
  padding: ${pixelToRem(20)};
  height: fit-content;
  width: 100%;
  background: ${(props) => props.theme.colors.white};
`;

const SubmitButton = styled.button<{ color: string }>`
  background-color: ${(props) => props.theme.colors[props.color]};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colors.white};
  font-weight: bold;
  display: block;
  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.colors.gray400};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    height: 2rem;
    border-radius: 20px;
  }
`;

const Select = styled.select`
  border: none;
  border-radius: 5px;
  width: 100%;
  padding: 0 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.h4};
  height: ${pixelToRem(40)};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: ${(props) => props.theme.colors.gray900};
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  input {
    height: ${pixelToRem(40)};
    border-radius: 5px;
    width: 100%;
    color: ${(props) => props.theme.colors.gray900};
    padding: 1rem;
  }

  label {
    padding: 0.5rem;
    color: ${(props) => props.theme.colors.gray900};
  }
`;

const ToggleGroup = styled.div`
  width: 35%;
  height: 30px;
  background-color: ${(props) => props.theme.colors.gray200};
  text-align: center;
  margin: auto;
  border-radius: 15px;
  margin-bottom: 1.5rem;

  .inactive {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.h5};
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.colors.mainDark};
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.h5};
  }
`;

const ImageControlContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 3.25rem;
  background-color: white;
  > p {
    background-color: ${(props) => props.theme.colors.gray200};
    width: 70%;
    height: ${pixelToRem(28)};
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const FileSelectionButton = styled.button`
  background-color: ${(props) => props.theme.colors.mainLight};
  border-radius: 10px;
  height: ${pixelToRem(28)};
  color: ${(props) => props.theme.colors.white};
  width: ${pixelToRem(80)};
  font-weight: bold;
`;

interface NFT {
  tokenId: number;
  tokenURI: string;
}

interface TokenDetail {
  tokenName: string;
  imagePath: string;
}

interface Sticker {
  tokenId: number;
  tokenURL: string;
  tokenName: string;
}

type FormValues = {
  name: string;
  regionId: number;
  locationAddress: string;
  lat: number;
  lng: number;
  amount: number;
  managerEmail: string;
};

function AdminPage() {
  const [sstartDate, setSStartDate] = useState<Date | null>(new Date());
  const [sendDate, setSEndDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [NFTDetailList, setNFTDetailList] = useState<TokenDetail[]>([]);
  const [NFTList, setNFTList] = useState<NFT[]>([]);
  const [type, setType] = useState(0);
  const [checked, setChecked] = useState([]);
  const [posterImage, setPosterImage] = useState<File | null>();
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const fileInput = useRef<HTMLInputElement>(null);

  const handleCheck = (e: { target: { checked: any; value: any } }) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!sstartDate || !sendDate) return;
    if (type !== 1 && type !== 0) return;
    if (!posterImage) return;
    const stickerList: React.SetStateAction<Sticker[]> = [];
    checked.map((item) => {
      const sticker = {
        tokenId: NFTList[item].tokenId,
        tokenURL: NFTList[item].tokenURI,
        tokenName: NFTDetailList[item].tokenName,
      };
      stickerList.push(sticker);
    });
    const startDate = changeDateFormatToHyphen(sstartDate);
    const endDate = changeDateFormatToHyphen(sendDate);
    const body = {
      place: {
        startDate,
        endDate,
        type,
        stickerList,
        ...data,
      },
    };
    const formData = new FormData();
    const bodyString = JSON.stringify(body);
    formData.append(
      "place",
      new Blob([bodyString], { type: "application/json" }),
    );
    if (posterImage) {
      formData.append("file", posterImage);
    }
    let response;
    response = await axiosInstance.post(placeApis.place, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });

    try {
      if (response.status === 200) {
        alert("등록되었습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getNFTList = async () => {
    try {
      setLoading(true);
      const result = await NFTContract.methods
        .getStickerList("0x95A7864017658bFC2f14e436B9Cc541d08FE28D0")
        .call();
      if (result) {
        setNFTList(result);
        const tokenList: React.SetStateAction<TokenDetail[]> = [];
        for (var i = 0; i < result.length; i++) {
          await fetch(`https://www.infura-ipfs.io/ipfs/${result[i].tokenURI}`)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              const token: TokenDetail = {
                tokenName: String(data[0].name),
                imagePath: String(data[0].image),
              };
              tokenList.push(token);
            });
        }
        setNFTDetailList(tokenList);
        setLoading(false);
      }
    } catch (err) {
      console.log("Error getSticker : ", err);
    }
  };

  useEffect(() => {
    getNFTList();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      regionId: 1,
      locationAddress: "",
      lat: 0,
      lng: 0,
      amount: 0,
      managerEmail: "",
    },
  });

  const changeType = (type: number) => {
    setType(type);
  };

  const isChecked = (item: any) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const onLoadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const file = files && files[0];
    if (file) {
      import("../../utils/functions/changeFileType").then(async (change) => {
        const resizedFile = await change.resizeImage(file);
        setPosterImage(resizedFile);
        encodeFileToBase64(resizedFile);
      });
    }
  };

  const encodeFileToBase64 = useCallback((fileBlob: File) => {
    if (!fileBlob) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      const tmpImage = reader.result as string;
      setImageSrc(tmpImage);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>관리자페이지 | 여행조각</title>
      </Helmet>
      <Container>
        <Title>이벤트 등록(수정)</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ToggleGroup>
            <button
              type="button"
              className={type === 0 ? "active" : "inactive"}
              onClick={() => changeType(0)}
            >
              스팟
            </button>
            <button
              type="button"
              className={type === 1 ? "active" : "inactive"}
              onClick={() => changeType(1)}
            >
              축제
            </button>
          </ToggleGroup>
          <TitleInput
            {...register("name", {
              required: "이벤트명을 입력해주세요.",
              maxLength: {
                value: 10,
                message: "제목은 10자 이내로 작성해주세요.",
              },
            })}
            placeholder="축제 / 지역 명"
          />
          <Select
            {...register("regionId", {
              required: true,
              valueAsNumber: true,
            })}
          >
            {REGIONLIST.slice(1).map((region, idx) => (
              <option value={idx + 1} key={idx}>
                {region}
              </option>
            ))}
          </Select>
          <TitleInput
            {...register("locationAddress", {
              required: "자세한 장소를 입력해주세요.",
              maxLength: {
                value: 30,
                message: "30자 이내로 작성해주세요.",
              },
            })}
            placeholder="장소"
          />
          <TitleInput
            {...register("managerEmail", {
              required: "담당자 이메일을 입력해주세요.",
              maxLength: {
                value: 20,
                message: "20자 이내로 작성해주세요.",
              },
            })}
            placeholder="담당자 이메일"
          />
          <TitleInput
            {...register("lat", {
              required: true,
              valueAsNumber: true,
            })}
            placeholder="위도"
          />
          <TitleInput
            {...register("lng", {
              required: true,
              valueAsNumber: true,
            })}
            placeholder="경도"
          />
          <TitleInput
            {...register("amount", {
              required: true,
              valueAsNumber: true,
            })}
            placeholder="스티커 총 수량"
          />
          <Flex>
            <DatePicker
              selected={sstartDate}
              onChange={(date) => setSStartDate(date)}
              selectsStart
              startDate={sstartDate}
              endDate={sendDate}
              dateFormat="yyyy-MM-dd"
            />
            <DatePicker
              selected={sendDate}
              onChange={(date) => setSEndDate(date)}
              selectsEnd
              startDate={sstartDate}
              endDate={sendDate}
              minDate={sstartDate}
              dateFormat="yyyy-MM-dd"
            />
          </Flex>
          <InfoBox>
            <h5>NFT 스티커 목록</h5>
            {loading && <p>loading . . .</p>}
            {!loading && (
              <div className="stickerList">
                {NFTDetailList.map((NFTdetail, idx) => (
                  <div key={idx}>
                    <input
                      type="checkbox"
                      id="sticker"
                      value={idx}
                      onChange={handleCheck}
                    />
                    <span className={isChecked(idx)}>
                      {NFTdetail.tokenName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </InfoBox>
          <input
            style={{ display: "none" }}
            type="file"
            id="todayPhoto"
            accept="image/jpg, image/jpeg, image/png"
            onChange={onLoadFile}
            ref={fileInput}
          />
          <ImageControlContainer>
            <p>{posterImage?.name}</p>
            <FileSelectionButton
              type="button"
              onClick={() => fileInput.current?.click()}
            >
              파일 선택
            </FileSelectionButton>
          </ImageControlContainer>
          <ButtonGroup>
            <SubmitButton
              color="mainLight"
              type="submit"
              disabled={!sstartDate || !sendDate}
            >
              등록
            </SubmitButton>
            <SubmitButton color="red" type="button">
              취소
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </Container>
    </>
  );
}
export default AdminPage;
