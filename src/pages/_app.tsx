import { AppProps } from "next/app";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TokenConfig } from "@/lib/custom/token";
import "@/styles/globals.css";

const queryClient = new QueryClient();
const tokenConfig = new TokenConfig();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = tokenConfig.getToken();
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
