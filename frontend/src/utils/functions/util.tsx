/* eslint-disable import/prefer-default-export */
export function isQueryError(error: unknown): error is Error {
  return error instanceof Error;
}
