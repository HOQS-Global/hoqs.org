import { useRef } from "react";
import { supabase } from "../../helpers/supabase";
import { useSupabaseRequest } from "../../helpers/supabaseRequest";
import { PageContainer } from "@hoqs/core-components";
import Editor from "../../document/Editor";
import { WikiDocument } from "../../types/types";

type Props = {id: string}

export function EditWiki({id}: Props) {
  const docRef = useRef(supabase.from('wikis').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest<WikiDocument[]>(docRef.current);

  const wiki = data?.[0];
  
  return (
    <PageContainer>
      {wiki && <Editor defaultDocument={wiki} />}
      <StatusComponent />
    </PageContainer>
  );
}