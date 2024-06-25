import NotFound from "@/components/NotFound";
import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import Logo from "@/components/Logo";
import { MicIcon } from "lucide-react";

export const Route = createRootRoute({
  component: () => {
    const route = useLocation();

    return (
      <div className="min-h-screen flex flex-col">
        {route.pathname !== "/" && (
          <nav className="flex md:flex-row flex-col md:justify-start justify-center items-center mb-4 flex-wrap md:gap-y-8">
            <Link className="py-4 pl-6" to="/">
              <Logo />
            </Link>
            <Link to="/speech-to-text">
              <MicIcon size={30} className="text-emerald-600" />
            </Link>
          </nav>
        )}
        <Outlet />
        {/* @ts-ignore */}
        {import.meta.DEV && <TanStackRouterDevtools />}
      </div>
    );
  },
  notFoundComponent: () => <NotFound />,
});
