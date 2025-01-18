import React, { PropsWithChildren } from 'react';
import { cn } from '../util';

type Props = PropsWithChildren<{ className?: string }>;

export function PageContainer({ children, className }: Props) {
  return (
    <main
      className={cn(
        'xl:w-[1024px] lg:w-[700px] sm:w-[640px] w-full',
        className
      )}
    >
      {children}
    </main>
  );
}

export default PageContainer;
