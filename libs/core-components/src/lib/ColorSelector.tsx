import { Button } from '@heroui/react';
import { LuCheck } from 'react-icons/lu';

export type ColorVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'secondary';

interface Props {
  color: ColorVariant;
  setColor: (color: ColorVariant) => void;
}

export const COLORS = [
  'primary',
  'secondary',
  'danger',
  'warning',
  'success',
  'default',
] satisfies ColorVariant[];

export function ColorSelector({ color, setColor }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((c) => (
        <Button size="sm" color={c} isIconOnly onPress={() => setColor(c)}>
          {color === c && <LuCheck/>}
        </Button>
      ))}
    </div>
  );
}

export default ColorSelector;
