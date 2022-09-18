/* eslint-disable import/prefer-default-export */
export const isQueryError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const pixelToRem = (size: number) => `${size / 16}rem`;

export const PadZero = (num: number | undefined) => {
  return String(num).padStart(2, "0");
};

export const changeDateForamt = (date: Date): string => {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
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
