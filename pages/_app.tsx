import "antd/dist/reset.css";
import AppLayout from "@/components/Layout";
import { Spin } from "antd";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import { store } from "../store";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  if (!(router.pathname === "/" || router.pathname === "/_error")) {
    return (
      <Provider store={store}>
        <AppLayout>
          <Component {...pageProps}>
            <Spin />
          </Component>
        </AppLayout>
      </Provider>
    );
  }

  return <Component {...pageProps} />;
};

export default MyApp;
