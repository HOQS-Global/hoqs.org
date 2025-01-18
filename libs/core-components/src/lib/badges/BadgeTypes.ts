import { IconType } from "react-icons/lib";
import { ColorVariant } from "../ColorSelector";

export interface BadgeType {
  title: string;
  color: ColorVariant;
  variant: 'dot' | 'shadow' | 'solid' | 'bordered' | 'light' | 'flat' | 'faded';
  icon?: IconType;
}
