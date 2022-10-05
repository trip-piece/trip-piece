import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Web3 from "web3";
import { UserInfoState } from "../../store/atom";
import axiosInstance from "../apis/api";
import userApis from "../apis/userApis";
import { setCookie } from "../cookie";

export interface Idata {
  walletAddress: string;
}

export interface IUserData {
  userId: number;
  walletAddress: string;
  nickname: string;
  tripCount: number;
  diaryCount: number;
}

function useLogin(data: Idata) {
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  const navigate = useNavigate();

  const moveToMain = () => {
    navigate("/main");
  };

  axiosInstance
    .post(userApis.login, data)
    .then(
      (response: { data: { accessToken: string; refreshToken: string } }) => {
        setCookie("accessToken", response.data.accessToken);
        setCookie("refreshToken", response.data.refreshToken);

        return response.data.accessToken;
      },
    )
    .then((token) => {
      axiosInstance
        .get(userApis.getUser, { headers: { ACCESS_TOKEN: token } })
        .then((response: { data: IUserData }) => {
          setUserInfo({
            ...userInfo,

            address: response.data.walletAddress,
            nickname: response.data.nickname,
            balance: "0.0",
            isLoggedIn: true,
            id: response.data.userId,
            tripCount: response.data.tripCount,
            diaryCount: response.data.diaryCount,
          });
          return userInfo.address;
        })
        .then((address) => {
          const web3 = new Web3(
            new Web3.providers.HttpProvider(import.meta.env.VITE_WEB3_URL),
          );
          if (address) {
            web3.eth
              .getBalance(address)
              .then((balance) => {
                return web3.utils.fromWei(balance, "ether");
              })
              .then((eth) => {
                setUserInfo({ ...userInfo, balance: eth });

                moveToMain;
              });
          }
          setCookie("isLogin", "true");
        });
    });
}

export default useLogin;
