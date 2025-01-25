import { Accordion, AccordionItem, Chip, Link as LinkH } from '@heroui/react'
import { cn } from '@hoqs/core-components';
import { useNavigate } from '@tanstack/react-router';
import { WikiDocument } from '../types/types';
import { useMemo } from 'react';
type DocumentType = Pick<WikiDocument, 'id' | 'title' | 'category' | 'parent_id' | 'order' | 'created_at'>

type Category = {
    title: string
    tree: TreeNode[]
}

type TreeNode = {
    title: string,
    children: TreeNode[],
    document: DocumentType
}

type DocumentPanelProps = {
    documents: DocumentType[]
    activeDocumentId: string
}

const itemClasses = {
    title: "text-md",
    trigger: "py-0",
    titleWrapper: "flex-none",
    indicator: "text-white",
};

const NEW_STATUS_TIME_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export function DocumentPanel({documents, activeDocumentId}: DocumentPanelProps) {
    const categories = useCategories(documents);
    
    return <div className="w-52">
        <Accordion isCompact selectionMode='multiple' itemClasses={itemClasses} showDivider={false}>
            {categories.map(({title, tree}) => 
                <AccordionItem key={title} aria-label={title} title={title} className="mb-3">
                {tree.map(node => <TreeNodeComponent key={node.document.id} activeDocumentId={activeDocumentId} node={node} />)}
            </AccordionItem>
            )}
        </Accordion>    
    </div>
}

type TreeNodeComponentProps = {
    node: TreeNode
    activeDocumentId: string
}


function TreeNodeComponent({node, activeDocumentId}: TreeNodeComponentProps) {
    const navigate = useNavigate();
    const isActive = node.document.id === activeDocumentId;
    const isNew = new Date(node.document.created_at).getTime() > Date.now() - NEW_STATUS_TIME_MS

    const goToWiki = () => {
        navigate({to: '/wiki/$id', params: {id: node.document.id}})
    }

    return <div className="ml-4">
        <LinkH
            onPress={goToWiki}
            className={cn("textfont-medium flex gap-4 sm:text-sm my-3 cursor-pointer", isActive ? "text-foreground" : "text-foreground/60")}>
            <span className={cn("w-1 min-w-1 min-h-1 h-1 rounded-full", isActive ? "bg-foreground" : "bg-foreground/40")} /> 
            {node.title}
            {isNew && <Chip color="primary" size="sm" className="-my-2" variant="flat">New</Chip>}
        </LinkH>
        {node.children.map(child => <TreeNodeComponent activeDocumentId={activeDocumentId} key={child.document.id} node={child} />)}
    </div>
}

function useCategories(documents: DocumentType[]): Category[] {
    return useMemo(() => {
        return documents.sort((a,b) => a.order - b.order).reduce((acc: Category[], document) => {
            const category = acc.find(category => category.title === document.category)
            if (category) {
                const parent = category.tree.find(node => node.document.id === document.parent_id)
                if (parent) {
                    parent.children.push({ title: document.title, children: [], document })
                } else {
                    category.tree.push({ title: document.title, children: [], document })
                }
            } else {
                acc.push({ title: document.category, tree: [{ title: document.title, children: [], document }] })
            }
            return acc
        }, [])
    }, [documents]);
}
