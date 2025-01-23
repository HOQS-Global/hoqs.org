import { useRef } from "react";
import { supabase } from "../../helpers/supabase";
import { useSupabaseRequest } from "../../helpers/supabaseRequest";
import { PageContainer } from "@hoqs/core-components";
import Editor from "../../document/Editor";
import { DocumentType } from "../../types/types";

type Props = {id: string}

export function EditWiki({id}: Props) {
  const docRef = useRef(supabase.from('documents').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest<DocumentType[]>(docRef.current);

  const document = data?.[0];
  
  return (
    <PageContainer>
      {document && <Editor defaultDocument={document} />}
      <StatusComponent />
    </PageContainer>
  );
}