import { PageContainer } from '@hoqs/core-components'
import AddDocumentButton from '../../document/AddDocumentButton'

export function WikiOverview() {
  return (
    <PageContainer>
      <AddDocumentButton />
      <div>List of all documents</div>
    </PageContainer>
  )
}