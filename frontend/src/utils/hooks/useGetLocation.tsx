import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { UserInfoState } from "../../store/atom";
import { getLocation } from "../functions/util";
import { ICoordinate } from "../interfaces/places.interface";

function useGetLocation() {
  const userInfo = useRecoilValue(UserInfoState);

  const {
    isFetching: IslocationFetching,
    data: locationData,
    refetch: refetchLocation,
  } = useQuery<ICoordinate, AxiosError>(
    [`${userInfo.id}-MyCoordinate`],
    getLocation,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );
  return { IslocationFetching, locationData, refetchLocation };
}

export default useGetLocation;
