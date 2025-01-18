import { StandardLayout } from '@hoqs-features'
import { QueryClient } from '@tanstack/react-query'
import { createRootRoute, Navigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute<{queryClient: QueryClient}>({
  component: StandardLayout,
  notFoundComponent: () => <Navigate to='/'/>,
})
