import { PropsWithChildren } from 'react';
import { Enums } from '../types/supabase';
import { useAuth } from '../helpers/auth';


type ProtectedFeatureProps = PropsWithChildren<{
  roles?: Enums<'role'>[];
  feedback?: boolean;
}>;

export default function ProtectedFeature({
  children,
  roles = ['admin'],
  feedback = false,
}: ProtectedFeatureProps) {
  const user = useAuth();
  const hasRole = roles?.includes(user?.api_role as Enums<'role'>);

  if (!hasRole) {
    if (!feedback) return null;
    return (
      <div>
        You need one of the following role(s) {roles.join(', ')} to use this
        feature.
      </div>
    );
  }

  return children;
}
