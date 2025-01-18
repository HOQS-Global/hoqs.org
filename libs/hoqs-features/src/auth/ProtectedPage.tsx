import { PropsWithChildren } from 'react';
import { useAuth } from '../helpers/auth';
import { Enums } from '../types/supabase';
import { PageContainer } from '@hoqs/core-components';
import { CircularProgress } from "@heroui/react";

type ProtectedPageProps = PropsWithChildren<{ roles?: Enums<'role'>[] }>;

export default function ProtectedPage({
  children,
  roles = ['admin'],
}: ProtectedPageProps) {
  const user = useAuth();
  if (user?.id !== undefined && user?.api_role === undefined) {
    return (
      <PageContainer>
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress size="md" aria-label="Loading..." />
        </div>
      </PageContainer>
    );
  }
  const hasRole = roles?.includes(user?.api_role as Enums<'role'>);

  if (!hasRole) {
    return (
      <PageContainer>
        <h3>You do not have access rights to this page</h3>
        <div>
          You are not logged in or do not have the required access rights to
          view this page. Only users with the role(s) {roles.join(', ')} can
          view this page.
        </div>
      </PageContainer>
    );
  }

  return children;
}
