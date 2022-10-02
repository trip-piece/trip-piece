import axios from "axios";
import { ICoordinate } from "../interfaces/places.interface";

/* eslint-disable import/prefer-default-export */
export const isQueryError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const pixelToRem = (size: number) => `${size / 16}rem`;

export const PadZero = (num: number | undefined) => {
  return String(num).padStart(2, "0");
};

export const changeDateFormatToDot = (date: string): string => {
  const _date = new Date(date);
  const year = String(_date.getFullYear());

  const month = PadZero(_date.getMonth() + 1);
  const day = PadZero(_date.getDate());

  return `${year}.${month}.${day}`;
};

export const getDayName = (date: Date) => {
  return date
    .toLocaleDateString("ko-KR", {
      weekday: "long",
    })
    .substring(0, 1);
};

export const createDate = (date: Date) => {
  return new Date(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
  );
};

export const getDatesStartToLast = (startDate: string, lastDate: string) => {
  const result = [];
  const curDate = new Date(startDate);
  const _lastDate = new Date(lastDate);
  while (curDate <= _lastDate) {
    const copiedDate = new Date(curDate.getTime());
    result.push(copiedDate);
    curDate.setDate(curDate.getDate() + 1);
  }
  return result;
};

export const changeDateFormatToHyphen = (date: Date): string => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().split("T")[0];
};

export const getLocation = (): Promise<ICoordinate> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const now = new Date();
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const address: string | any = await getLocationAddress(
            position.coords.latitude,
            position.coords.longitude,
          );
          resolve({
            err: 0,
            time: now.toLocaleTimeString(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: address,
          });
        },
        (err) => {
          console.log(err);
          resolve({
            err: -1,
            latitude: -1,
            longitude: -1,
            location: "위치를 찾을 수 없어요",
          });
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 },
      );
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        error: -2,
        latitude: -1,
        longitude: -1,
        location: "위치를 찾을 수 없어요",
      });
    }
  });
};

export const getLocationAddress = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.JSON?input_coord=WGS84&x=${lng}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
        },
      },
    );
    const location = await response.data.documents[1].address_name;
    return location;
  } catch (error) {
    console.log(error);
  }
};
