// This is a helper for storybook to work with tanstack router
/* eslint-disable react-refresh/only-export-components */
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  useRouter,
  useRouterState,
  type NotFoundRouteProps,
} from '@tanstack/react-router';
import React, { createContext, useContext, type ReactNode } from 'react';

//#region Dummy story router
function RenderStory() {
  const storyFn = useContext(CurrentStoryContext);
  if (!storyFn) {
    throw new Error('Storybook root not found');
  }
  return storyFn();
}

export const CurrentStoryContext = createContext<(() => ReactNode) | undefined>(
  undefined,
);

function NotFoundComponent(_props: NotFoundRouteProps) {
  const state = useRouterState();
  const router = useRouter();
  return (
    <div>
      <div>
        Simulating navigation to: <code>{state.location.href}</code>
      </div>
      <div
        style={{ fontWeight: 'bold', color: '#337' }}
        role="button"
        onClick={() => router.history.back()}
      >
        Go Back
      </div>
    </div>
  );
}

const storyPath = '/__story__';
const storyRoute = createRoute({
  path: storyPath,
  getParentRoute: () => rootRoute,
  component: RenderStory,
});

const rootRoute = createRootRoute({
  notFoundComponent: NotFoundComponent,
});
rootRoute.addChildren([storyRoute]);

export const storyRouter = createRouter({
  history: createMemoryHistory({ initialEntries: [storyPath] }),
  routeTree: rootRoute,
});
//#endregion

export function storyRouterDecorator(storyFn: () => ReactNode) {
  return (
    <CurrentStoryContext.Provider value={storyFn}>
      <RouterProvider router={storyRouter as any} />
    </CurrentStoryContext.Provider>
  );
}
