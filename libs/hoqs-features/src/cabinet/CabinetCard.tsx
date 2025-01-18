import { Card, CardFooter, CardHeader, Image } from '@heroui/react';
import { Link } from '@tanstack/react-router';
import { formatFrequency } from '../helpers/translations';
import { StorageImage } from '../types/types';
import { CabinetBadgeList } from './CabinetBadge';

interface Cabinet {
  id: string;
  brand: string;
  model: string;
  images: StorageImage[];
  type: string;
  badges: string[];
  frequency_start: number;
  frequency_end: number;
  sensitivity: number;
}

interface Props {
  cabinet: Cabinet;
}

export function CabinetCard({ cabinet }: Props) {
  return (
    <Link to={'/cabinets/' + cabinet.id} className="w-fit flex">
      <Card className="col-span-12 sm:col-span-4 h-64 w-64 cursor-pointer outline-1 hover:outline-primary-500">
        <CardHeader className="absolute pointer-events-none z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {cabinet.brand}
          </p>
          <h4 className="text-white font-medium text-large">{cabinet.model}</h4>
          <p className="text-tiny text-white/60">
            {cabinet.type} |{formatFrequency(cabinet.frequency_start)}-
            {formatFrequency(cabinet.frequency_end)} | {cabinet.sensitivity}dB
          </p>
        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          alt={'Image of ' + cabinet.model}
          className="z-0 w-full h-full object-contain"
          src={cabinet.images?.[0]?.url}
        />
        <CardFooter className="absolute bottom-0 w-full">
          <CabinetBadgeList
            badges={cabinet.badges}
            size="sm"
            className="flex-col-reverse items-end w-full"
          />
        </CardFooter>
      </Card>
    </Link>
  );
}

export default CabinetCard;
