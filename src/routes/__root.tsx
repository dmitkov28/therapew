import Logo from "@/components/Logo";
import NotFound from "@/components/NotFound";
import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { MicIcon } from "lucide-react";
import "../index.css";

export const Route = createRootRoute({
  component: () => {
    const route = useLocation();

    return (
      <div className="min-h-screen flex flex-col">
        {route.pathname !== "/" && (
          <nav className="sticky top-0 w-full bg-white shadow-sm z-10">
            <div className="container mx-auto px-4 flex items-center justify-between">
              <Link className="py-4" to="/">
                <div className="flex items-center">
                  <Logo />
                  {!navigator.onLine && (
                    <span className="relative text-xs text-gray-400 border-2 border-gray-400 rounded-md py-1/2 px-2">
                      offline
                    </span>
                  )}
                </div>
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  to="/speech-to-text"
                  className="p-2 rounded-full hover:bg-emerald-50 transition-colors duration-200"
                >
                  <MicIcon size={30} className="text-emerald-600" />
                </Link>
              </div>
            </div>
          </nav>
        )}
        <main className="flex-grow container mx-auto px-4">
          <Outlet />
        </main>
        <footer className="py-4 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} 🐣
          </div>
        </footer>
        {/* @ts-ignore */}
        {import.meta.DEV && <TanStackRouterDevtools />}
      </div>
    );
  },
  notFoundComponent: () => <NotFound />,
});
