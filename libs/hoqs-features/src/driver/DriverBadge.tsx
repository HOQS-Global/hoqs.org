import Badge from '../../../core-components/src/lib/badges/Badge';
import BadgeList from '../../../core-components/src/lib/badges/BadgeList';
import { DRIVER_BADGES } from '../helpers/variables';

interface Props {
  badgeTitle?: string | undefined;
  size?: 'sm' | 'md' | 'lg';
}

export function DriverBadge({ badgeTitle, size }: Props) {
  return (
    <Badge badgeTitle={badgeTitle} size={size} badgeTypes={DRIVER_BADGES} />
  );
}

interface ListProps {
  badges: string[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DriverBadgeList({ badges, size, className }: ListProps) {
  return (
    <BadgeList
      badges={badges}
      className={className}
      size={size}
      badgeTypes={DRIVER_BADGES}
    />
  );
}

export default DriverBadge;
