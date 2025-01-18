import { EditCabinet } from '@hoqs-features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cabinets/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <EditCabinet id={id} />
}
