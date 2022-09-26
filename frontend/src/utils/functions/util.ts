/* eslint-disable import/prefer-default-export */
export const isQueryError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const pixelToRem = (size: number) => `${size / 16}rem`;

export const PadZero = (num: number | undefined) => {
  return String(num).padStart(2, "0");
};

export const changeDateForamtToDot = (date: string): string => {
  const _date = new Date(date);
  const year = String(_date.getFullYear()).substring(2);

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
