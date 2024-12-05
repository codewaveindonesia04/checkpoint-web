import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TokenConfig } from "@/lib/config/token";
import { RoleConfig } from "@/lib/config/role";
import Loading from "@/components/atomic/Loading";
import "@/styles/globals.css";

const queryClient = new QueryClient();
const tokenConfig = new TokenConfig();
const roleConfig = new RoleConfig();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function validateAccess() {
      try {
        const token = tokenConfig.getToken();
        if (!token) {
          router.push("/");
          return;
        }

        const roleData = await roleConfig.getRole();
        if (!roleData) {
          router.push("/");
          return;
        }

        const user = JSON.parse(roleData);
        const userRole = user?.data?.role;
        const accessToken = user?.data?.access_token;

        if (!userRole || !accessToken) {
          router.push("/");
          return;
        }

        const roleBasedRoutes: Record<string, (path: string) => boolean> = {
          HR: (path) => path.startsWith("/admin"),
          EMPLOYEE: (path) => path.startsWith("/employee"),
        };

        const publicRoutes = ["/"];
        const isPublicRoute = publicRoutes.includes(router.pathname);

        const isAuthorizedRoute =
          isPublicRoute ||
          (roleBasedRoutes[userRole]?.(router.pathname) ?? false);

        if (!isAuthorizedRoute) {
          router.push("/");
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Error during access validation:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }

    validateAccess();
  }, [router.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return isAuthorized ? (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  ) : null;
}
