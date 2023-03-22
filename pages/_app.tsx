import 'antd/dist/reset.css';
import AppLayout from '../components/layout';
import { Spin } from 'antd';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps,router }: AppProps) {
  if (router.pathname.startsWith('/dashboard')) {
    return (
      <AppLayout>
        <Component {...pageProps} ><Spin/></Component>
        
      </AppLayout>
    )
  }
  
  return <Component {...pageProps} />
}

export default MyApp
