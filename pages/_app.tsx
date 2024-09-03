import { config, library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

import 'windi.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BlogLayout from '../components/layout/BlogLayout'
import Head from 'next/head'

import AOS from 'aos';
import 'aos/dist/aos.css';
import type { ReactElement, ReactNode } from "react";
import { useEffect } from 'react';
import NextNprogress from 'nextjs-progressbar';
import type { NextPage } from 'next'
import { pageview } from '../lib/gtag'
import { ThemeProvider } from 'next-themes'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

config.autoAddCss = false
library.add(fab)

declare global {
  interface Window {
    _hmt: any;
  }
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    const handleRouteChange = (url: string) => {
      pageview(url, document.title);
      try {
        window._hmt.push(['_trackPageview', url]);
      } catch (e) { }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  const getLayout = Component.getLayout || ((page: any) => <BlogLayout>{page}</BlogLayout>);

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>可乐君的个人主页</title>
        <meta name="description" content="可乐君の小站" />
        <link rel="apple-touch-icon" sizes="180x180" href="/color.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/color.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/color.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="//cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.6.0/lxgwwenkaiscreen.css" media="print" onload="this.media='all'">
        <script defer src="https://status.xiaoayu.ren/script.js" data-website-id="f16983ff-10ab-49eb-a1ce-a5fca1ff70ba"></script>
      </Head>
      <NextNprogress color="#ff9500" options={{ showSpinner: false }} />
      {getLayout(
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  )
}

export default MyApp
