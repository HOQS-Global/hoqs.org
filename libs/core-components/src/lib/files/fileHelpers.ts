import { LuFileText, LuFileSliders, LuChartLine, LuMic, LuSquareKanban, LuDraftingCompass, LuBox, LuSparkles, LuShip } from "react-icons/lu";
import { BadgeType } from "../badges/BadgeTypes";

export type StorageFile = {
  description: string;
  badges?: string[];
} & AbstractStorageFile;

export interface AbstractStorageFile {
  title: string;
  url: string;
  updatedAt: string;
  createdAt: string;
  size: number;
  mimetype: string;
}

export const FILE_BADGES = [
  { title: 'Manual', color: 'primary', variant: 'shadow', icon: LuFileText },
  {
    title: 'HornResp',
    color: 'secondary',
    variant: 'shadow',
    icon: LuFileSliders,
  },
  {
    title: 'Measurements',
    color: 'secondary',
    variant: 'shadow',
    icon: LuChartLine,
  },
  { title: 'REW', color: 'secondary', variant: 'shadow', icon: LuMic },
  {
    title: 'AKABAK',
    color: 'secondary',
    variant: 'shadow',
    icon: LuSquareKanban,
  },
  {
    title: 'Illustration',
    color: 'warning',
    variant: 'shadow',
    icon: LuDraftingCompass,
  },
  {
    title: '3D-Model',
    color: 'warning',
    variant: 'shadow',
    icon: LuBox,
  },
  {
    title: 'Sketch-up',
    color: 'warning',
    variant: 'shadow',
    icon: LuDraftingCompass,
  },
  { title: 'New', color: 'danger', variant: 'shadow', icon: LuSparkles },
  { title: 'Old', color: 'default', variant: 'shadow', icon: LuShip },
] satisfies BadgeType[];