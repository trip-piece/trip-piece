import "@emotion/react";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      [name: string]: string;
    };
    fontSizes: {
      [size: string]: string;
    };
  }
}
