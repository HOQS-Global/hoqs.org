import { Header, Markdown } from "@hoqs/core-components";
import { WikiDocument } from "../types/types";

type Props = {
    document: WikiDocument;
  };
  
  export default function Document({ document }: Props) {
    return <>
      <Header>{document.title}</Header>
      <Markdown>{document.content}</Markdown>
    </>;
  }
  