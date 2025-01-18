import { createHashHistory, createRouter } from '@tanstack/react-router'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import type { RouteIds } from '@tanstack/react-router'

const hashHistory = createHashHistory()

// Set up a Router instance
export const router = createRouter({
  routeTree,
  history: hashHistory,
  defaultPendingComponent: () => null
})

export type RouterType = typeof router
export type RouterIds = RouteIds<RouterType['routeTree']>
