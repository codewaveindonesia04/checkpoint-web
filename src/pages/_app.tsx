import { AppProps } from "next/app";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  return <Component {...pageProps} />;
}
