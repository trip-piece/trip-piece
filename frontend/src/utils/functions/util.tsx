/* eslint-disable import/prefer-default-export */
export function isQueryError(error: unknown): error is Error {
  return error instanceof Error;
}

export const pixelToRem = (size: number) => `${size / 16}rem`;
