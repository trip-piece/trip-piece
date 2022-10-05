import { useWeb3React } from "@web3-react/core";
import { useRecoilState } from "recoil";
import { UserInfoState } from "../../store/atom";
import axiosInstance from "../apis/api";
import userApis from "../apis/userApis";
import { setCookie } from "../cookie";

interface Idata {
  walletAddress: string;
}

interface IUserData {
  userId: number;
  walletAddress: string;
  nickname: string;
  tripCount: number;
  diaryCount: number;
}

function useLogin(data: Idata) {
  const { activate, active, account } = useWeb3React();
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);

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

          
        });
    });
}

setCookie("isLogin", "true");

export default useLogin;
