export const qrApis = {
  qrLog: "/places/QR",
  qrCheck: (placeId: number | undefined): string =>
    `/places/QRCheck/${placeId}`,
};
