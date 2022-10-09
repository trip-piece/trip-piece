import { ReactNode } from "react";

export interface IWindowSize {
  width: number | undefined;
}

export interface IChildren {
  children: ReactNode;
}

export interface IUseSize {
  width: number;
  height: number;
}
