import { Cabinet } from '@hoqs-features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cabinets/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <Cabinet id={id} />
}
