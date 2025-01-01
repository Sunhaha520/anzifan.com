import { config, library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Script from 'next/script';

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

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '//cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.7.0/lxgwwenkaiscreen.css';
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  }, []);

  // 动态插入脚本
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/cn/index.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.text = `
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7454868265346121740',
        },
        componentProps: {
          title: 'Coze',
        },
      });
    `;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const getLayout = Component.getLayout || ((page: any) => <BlogLayout>{page}</BlogLayout>);

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>可乐君の小站</title>
        <meta name="description" content="可乐君の小站" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="https://cdn.jkjoy.cn/LxgwWenKai_Webfonts/dist/LXGWWenKai-Bold.css" />
        <script defer src="https://status.xiaoayu.ren/script.js" data-website-id="f16983ff-10ab-49eb-a1ce-a5fca1ff70ba"></script>
      </Head>
      <NextNprogress color="#ff9500" options={{ showSpinner: false }} />
      {getLayout(
        <Component {...pageProps} />
      )}
      {/* 使用 Script 组件 */}
      <Script
        src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/cn/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          new CozeWebSDK.WebChatClient({
            config: {
              bot_id: '7454868265346121740',
            },
            componentProps: {
              title: 'Coze',
            },
          });
        }}
      />
    </ThemeProvider>
  )
}

export default MyApp
