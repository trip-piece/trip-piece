import imageCompression from "browser-image-compression";

export const encodeFileToBase64 = (fileBlob: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      const base64Image = reader.result as string;
      resolve(base64Image);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const dataURLtoFile = (dataurl: string, fileName: string) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], `${fileName}.png`, { type: mime });
};

export const resizeImage = async (imageFile: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 550,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return new File([compressedFile], compressedFile.name);
  } catch {
    return imageFile;
  }
};
