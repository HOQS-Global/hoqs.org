import { Link as LinkUI } from '@heroui/link';

export default function Link({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  const isExternal = href?.startsWith('http');

  return (
    <LinkUI href={href} isExternal={isExternal} showAnchorIcon={isExternal}>
      {children}
    </LinkUI>
  );
}
