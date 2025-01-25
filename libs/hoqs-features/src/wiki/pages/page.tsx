import React, { useMemo, useRef } from 'react'
import { supabase } from '../../helpers/supabase';
import { WikiDocument } from '../../types/types';
import { useSupabaseRequest } from '../../helpers/supabaseRequest';
import { PageContainer, UnpublishedBanner } from '@hoqs/core-components';
import ProtectedFeature from '../../auth/ProtectedFeature';
import { Button } from '@heroui/react';
import { Link } from '@tanstack/react-router';
import Document from '../../document/Document';
import WikiDocumenPanel from '../WikiDocumenPanel';

type Props = {id: string}

export function WikiPage({id}: Props) {
  const docRef = useMemo(() => supabase.from('wikis').select('*').eq('id', id), [id]);
  const { StatusComponent, data } = useSupabaseRequest<WikiDocument[]>(docRef);
  const document = data?.[0];
  
  return (
    <PageContainer leftSideBar={<WikiDocumenPanel/>}>
      <StatusComponent />
      <UnpublishedBanner show={document?.published === false} />
        <ProtectedFeature>
          <div className="w-full relative mt-4 flex justify-end top-0 right-0">
            <Button className="absolute" as={Link} disabled to={'./edit'} color="primary">
              Edit
            </Button>
          </div>
        </ProtectedFeature>
      {document && <Document document={document} />}
    </PageContainer>
  );
}