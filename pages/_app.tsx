import '@/styles/globals.css'
import { NextUIProvider, useSSR } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { SSRProvider } from '@react-aria/ssr'
import styles from '@/styles/Home.module.css'

export default function App({Component, pageProps}: AppProps) {
  const { isBrowser } = useSSR()
  return ( isBrowser &&
    <SSRProvider>
      <NextUIProvider>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </SSRProvider>
  );
}
