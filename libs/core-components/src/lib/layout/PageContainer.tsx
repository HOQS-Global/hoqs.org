import React, { PropsWithChildren } from 'react';
import { cn } from '../util';

type Props = PropsWithChildren<{ className?: string, leftSideBar?: React.ReactNode, rightSideBar?: React.ReactNode }>;

export function PageContainer({ children, className, leftSideBar, rightSideBar}: Props) {
  return <div className="flex">
    {leftSideBar && <aside className="w-52 hidden xl:block">{leftSideBar}</aside>}
    <main
      className={cn(
        'xl:w-[1024px] lg:w-[700px] sm:w-[640px] w-full',
        className
      )}
    >
      {children}
    </main>
    {rightSideBar && <aside className="w-52 hidden xl:block">{rightSideBar}</aside>}
  </div>
}

export default PageContainer;
