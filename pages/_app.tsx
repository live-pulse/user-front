import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { SSRProvider } from '@react-aria/ssr'
import styles from '@/styles/Home.module.css'
import MainNavbar from '@/components/navber/MainNavbar'

export default function App({Component, pageProps}: AppProps) {
  return <>
    <SSRProvider>
      <NextUIProvider>
        <main className={styles.main}>
          <MainNavbar />
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </SSRProvider>
  </>;
}
