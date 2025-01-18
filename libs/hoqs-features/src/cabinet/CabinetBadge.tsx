import Badge from '../../../core-components/src/lib/badges/Badge';
import BadgeList from '../../../core-components/src/lib/badges/BadgeList';
import { CABINET_BADGES } from '../helpers/variables';

interface Props {
  badgeTitle?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
}

export function CabinetBadge({ badgeTitle, size }: Props) {
  return (
    <Badge badgeTitle={badgeTitle} size={size} badgeTypes={CABINET_BADGES} />
  );
}

interface ListProps {
  badges: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CabinetBadgeList({ badges, size, className }: ListProps) {
  return (
    <BadgeList
      badges={badges}
      className={className}
      size={size}
      badgeTypes={CABINET_BADGES}
    />
  );
}

export default CabinetBadge;
