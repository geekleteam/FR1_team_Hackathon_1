import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Auth0ContextInterface } from '@auth0/auth0-react';

interface AppContext {
  auth: Auth0ContextInterface;
}

export const Route = createRootRouteWithContext<AppContext>()({
  component: () => (
    <div className="relative bg-white text-gray-600 antialiased dark:bg-gray-900 dark:text-gray-400 w-full h-full">
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
