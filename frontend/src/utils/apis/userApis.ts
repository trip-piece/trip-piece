const userApis = {
  login: "user/login",
  getUser: "user",
  modifyNickname: "user/nickname",
  getMyScraps: `/user/scraps`,
};

export interface walletAddress {
  walletAddress?: string | null | undefined;
}

export interface Inickname {
  nickname: string;
}

export default userApis;
