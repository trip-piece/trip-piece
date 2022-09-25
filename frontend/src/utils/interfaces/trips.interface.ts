import { ReactNode } from "react";

export interface ITrip {
  tripId: number;
  regionId: number;
  title: string;
  startDate: string | Date;
  endDate: string | Date;
}

export interface IButtonProps {
  children?: ReactNode;
  text?: string;
  type: "button" | "submit" | "reset" | undefined;
  func?: () => void;
  disabled?: boolean;
  color?: string;
}

export interface RouteState {
  state: null | ITrip;
}
