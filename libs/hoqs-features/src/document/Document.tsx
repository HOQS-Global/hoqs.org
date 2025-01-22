import { Header, Markdown } from "@hoqs/core-components";
import { DocumentType } from "../types/types";

type Props = {
    document: DocumentType;
  };
  
  export default function Document({ document }: Props) {
    return <>
      <Header>{document.title}</Header>
      <Markdown>{document.content}</Markdown>
    </>;
  }
  