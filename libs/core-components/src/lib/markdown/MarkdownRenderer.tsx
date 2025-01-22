import MarkdownRenderer from 'markdown-to-jsx'
import Header from '../Header'
import Text from '../Text'
import { Blockquote } from './render-components/Blockquote'
import { Table, Tcol, Thead, Trow } from './render-components/Table'
import { List, OrderedList } from './render-components/List'
import Link from './render-components/Link'
import { Code, Divider, Kbd } from '@heroui/react'
import Image from './render-components/Image'


type Props = {
    className?: string
    children: string
}

export function Markdown({className, children}: Props) {
  return (
    <MarkdownRenderer
        className={className}
        options={{
            overrides: {
        h1: {component: ({ children }) => <Header variant="title">{children}</Header>},
        h2: {component: ({ children }) => <Header variant="subtitle">{children}</Header>},
        h3: {component: ({ children }) => (
            <Header variant="sub-subtitle">{children}</Header>
        )},
        h4: {component: ({ children }) => <Text variant="thick">{children}</Text>},
        p: {component: ({ children }) => {
            if (children[0]?.type?.name === 'Image') return children // Don't wrap images in p - A hack to fix a bug in markdown-to-jsx
            return <Text>{children}</Text>
        }},
        strong: {component: ({ children }) => <strong className="font-semibold">{children}</strong>},
        b: {component: ({ children }) => <Text>{children}</Text>},
        blockquote: {component: ({ children }) => <Blockquote><ReplaceNewlines text={children?.[0]?.props?.children?.[0]} /></Blockquote>},
        table: {component: ({ children }) => <Table>{children}</Table>},
        thead: {component: ({ children }) => <Thead>{children}</Thead>},
        tr: {component: ({ children }) => <Trow>{children}</Trow>},
        td: {component: ({ children }) => <Tcol>{children}</Tcol>},
        ul: {component: ({ children }) => <List>{children}</List>},
        ol: {component: ({ children }) => <OrderedList>{children}</OrderedList>},
        li: {component: ({ children }) => <li>{children}</li>},
        a: {component: ({ children, href }) => <Link href={href}>{children}</Link>},
        kbd: {component: () => <Kbd className="py-0.5 px-1.5" />},
        hr: {component: Divider},
        img: {component: Image},
        code: {component: ({children}) => {
            console.log(children);
            return <Code className="px-2 py-1 text-primary-700"><ReplaceNewlines text={children}></ReplaceNewlines></Code>
        }},
        pre: {component: ({ children }) => (
            <pre className="[&>code]:w-full [&>code]:px-4 [&>code]:py-2">
            {children}
            </pre>
        )}
    }}}
    >
        {children}
    </MarkdownRenderer>
  )
}

/**
 * The markdown-to-jsx struggles with newlines, and this function is a workaround to fix that.
 * This hack is applied to blockquotes and code blocks. Both places, a single newline would not render as a newline.
 * For code it also indents the text.
 * 
 * @param text text to be rendered. Uses \n as a newline character.
 * @returns A span element with the text and newlines.
 */
function ReplaceNewlines({text}: {text?: string}) {
    const splittedText = text?.replace('&#x20;', ' ').split('\n') // Remove space rewritten as &#x20;
    const indentations = splittedText?.map((text:string) => text.match(/^\s*/)?.[0].length); // Get the number of spaces at the beginning of each line
    return splittedText?.map((text:string,index:number) => <span style={{marginLeft: `${(indentations?.[index] ?? 0) * 8}px`}} key={index}>{text}<br/></span>)
}