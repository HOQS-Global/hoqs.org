import { WikiOverview } from '@hoqs-features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wiki/')({
  component: WikiOverview,
})