const userApis = {
  login: "user/login",
  getUser: "user",
  modifyNickname: "user/nickname",
  getMyScraps: (page: number): string => `user/scraps?page=${page}`,
};

export interface walletAddress {
  walletAddress?: string | null | undefined;
}

export interface Inickname {
  nickname: string;
}

export default userApis;
