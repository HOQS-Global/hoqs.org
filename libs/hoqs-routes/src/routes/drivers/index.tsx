import { Drivers } from '@hoqs-features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drivers/')({
  component: Drivers,
})
