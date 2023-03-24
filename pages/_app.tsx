import "antd/dist/reset.css";
import AppLayout from "../components/Layout";
import { Spin } from "antd";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (!(router.pathname === "/" || router.pathname === "/_error")) {
    return (
      <AppLayout>
        <Component {...pageProps}>
          <Spin />
        </Component>
      </AppLayout>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
