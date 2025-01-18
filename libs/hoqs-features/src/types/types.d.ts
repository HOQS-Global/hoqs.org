import { Tables } from './supabase';
import { TIMELINE_ICONS } from '../lib/variables';

export type SpeakerCabinet = MergeWithOverwrite<
  Tables<'cabinets'>,
  {
    images: StorageImage[] | null;
    files: StorageFile[] | null;
    measurements: StorageMeasurements[] | null;
    contributors: Contributor[];
    timeline: TimelineEntry[];
  }
>;

export type MergeWithOverwrite<T, U> = Omit<T, keyof U> & U;

export type DriverType = Tables<'drivers'>;

export type DriverRank =
  | 'Optimal'
  | 'Excellent'
  | 'Good'
  | 'Okay'
  | 'Bad'
  | 'None';

export type CabinetRecommendedChanges = SpeakerCabinet & {
  recommendationChanges?: DriverRecommendation[];
};

export type DriverRecommendation = {
  id?: string;
  notes: string | null;
  rank: DriverRank;
  driver_id: string;
};

export type DriverRecommendationWithDriver = DriverRecommendation & {
  driver: {
    id: string;
    brand: string;
    model: string;
    size_inches: number;
    p_max: number;
    x_max: number;
  };
};


export function rankToRankNumber(rank: DriverRank): number {
  switch (rank) {
    case 'Optimal':
      return 5;
    case 'Excellent':
      return 4;
    case 'Good':
      return 3;
    case 'Okay':
      return 2;
    case 'Bad':
      return 1;
  }
  return 0;
}
