import { AppProps } from "next/app";
import cookie from "cookie";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export function getServerSideProps(context: any) {
  const cookies = cookie.parse(context.req.headers.cookie || "");
  const token = cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
