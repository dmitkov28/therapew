import NotFound from "@/components/NotFound";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex">
      <Outlet />
      {/* @ts-ignore */}
      {import.meta.DEV && <TanStackRouterDevtools />}
    </div>
  ),
  notFoundComponent: () => <NotFound />,
});
