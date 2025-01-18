import { router } from './router'

export type { RouterType, RouterIds } from './router'

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
export { router }
