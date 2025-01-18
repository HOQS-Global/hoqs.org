import { Cabinets } from '@hoqs-features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cabinets/')({
  component: Cabinets,
})
