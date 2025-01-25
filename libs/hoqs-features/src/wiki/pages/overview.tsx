import { formatDateTime, Header, PageContainer } from '@hoqs/core-components'
import { useNavigate } from '@tanstack/react-router';
import { useRef } from 'react';
import { supabase } from '../../helpers/supabase';
import { useSupabaseRequest } from '../../helpers/supabaseRequest';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { AddWikiButton } from '../../document/AddWikiButton';
import WikiDocumenPanel from '../WikiDocumenPanel';

export function WikiOverview() {
  const navigate = useNavigate();
  const docsRef = useRef(supabase.from('wikis').select('id, title, published, created_at').eq('static', false));
  const { StatusComponent, data } = useSupabaseRequest(docsRef.current);

  return (
    <PageContainer leftSideBar={<WikiDocumenPanel/>}>
      <AddWikiButton />
      <Header>Wikipedia</Header>
      <StatusComponent />
      {data &&
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Published</TableColumn>
        </TableHeader>
        <TableBody>
        {data && data.map((doc) => 
          <TableRow onClick={() => navigate({to: '/wiki/$id', params: {id: doc.id}})} key={doc.id}>
            <TableCell>{doc.title}</TableCell>
            <TableCell>{formatDateTime(doc.created_at)}</TableCell>
            <TableCell>{doc.published ? "Yes" : "No"}</TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>}
    </PageContainer>
  );
}
