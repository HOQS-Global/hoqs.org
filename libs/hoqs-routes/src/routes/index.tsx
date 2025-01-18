import { createFileRoute } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => redirect({to: '/cabinets', throw: true}),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/"!</div>
}
