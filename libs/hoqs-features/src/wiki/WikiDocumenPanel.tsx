import { useRef } from "react";
import { supabase } from "../helpers/supabase";
import { useSupabaseRequest } from "../helpers/supabaseRequest";
import { DocumentPanel } from "./DocumentPanel";
import { useLocation } from "@tanstack/react-router";

export default function WikiDocumenPanel() {
  const documentId = useLocation().pathname.split('/wiki/')[1];

  const docsRef = useRef(supabase.from('wikis').select('id, title, created_at, order, parent_id, category').eq('static', false));
  const { StatusComponent, data } = useSupabaseRequest(docsRef.current);

  if (!data) return <StatusComponent />

  return <DocumentPanel documents={data} activeDocumentId={documentId ?? ""} />
}