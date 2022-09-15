/* eslint-disable import/prefer-default-export */
export function isQueryError(error: unknown): error is Error {
  return error instanceof Error;
}

export const pixelToRem = (size: number) => `${size / 16}rem`;

export const changeDateForamt = (date: Date): string => {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _date = new Date(date);
  const year = String(_date.getFullYear()).substring(2);

  const month = String(_date.getMonth()).padStart(2, "0");
  const day = String(_date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
