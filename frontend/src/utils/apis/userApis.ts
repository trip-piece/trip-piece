const loginApis = {
  login: "api/user/login",
  getUser: "api/user",
  modifyNickname: "api/user/nickname",
  getMyScraps: "api/user/scraps",
};

export interface walletAddress {
  walletAddress?: string | null | undefined;
}

export default loginApis;
