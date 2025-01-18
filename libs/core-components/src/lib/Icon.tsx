import { IconType } from 'react-icons';
import { cn } from './util';
import { ColorVariant } from './ColorSelector';

interface Props {
  color: ColorVariant;
  Icon: IconType;
  size?: 'md';
}

export function Icon({ color, Icon, size = 'md' }: Props) {
  const bgColor = 'bg-' + color + '-100';
  const iconColor = 'text-' + color + '-500';
  return (
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${bgColor}`}
    >
      <Icon className={cn(iconColor, 'w-6 h-6')} />
    </div>
  );
}

export default Icon;
