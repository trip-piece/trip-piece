const colors = {
  /**  Main */
  mainGradient:
    "background: linear-gradient(180.69deg, #282B44 6.63%, #2C5166 99.4%)",
  mainDark: "#282B44",
  mainLight: "#2C5166",
  white: "#F8F8F8",
  /** Sub */
  blue: "#4B659C",
  lightBlue: "#C0CADB",
  yellow: "#FDD835",
  red: "#D35B5B",
  /** GrayScale */
  gray900: "#171717",
  gray800: "#262626",
  gray700: "#404040",
  gray600: "#525252",
  gray500: "#737373",
  gray400: "#999999",
  gray300: "#d4d4d4",
  gray200: "#E4E4E4",
  gray100: "#f5f5f5",
  gray50: "#fafafa",
};
const pixelToRem = (size: number) => `${size / 16}rem`;

const fontSizes = {
  h1: pixelToRem(36),
  h2: pixelToRem(30),
  h3: pixelToRem(24),
  h4: pixelToRem(20),
  h5: pixelToRem(18),
  paragraph: pixelToRem(16),
  s1: pixelToRem(14),
  s2: pixelToRem(12),
  s3: pixelToRem(10),
  s4: pixelToRem(6),
};

const theme = {
  colors,
  fontSizes,
};

export default theme;
