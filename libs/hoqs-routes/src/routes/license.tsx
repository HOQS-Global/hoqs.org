import { License } from '@hoqs-features'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/license')({
  component: License,
})
