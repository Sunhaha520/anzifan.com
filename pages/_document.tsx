import { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'


export default function Document() {
    const getBaiduAnalyticsTag = () => {
        return {
            __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?c921874886e42c6acfa4320c0acb880f";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();`,
        }
    }
    return (
        <Html>
            <Head>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `,
                    }}
                />
                <script dangerouslySetInnerHTML={getBaiduAnalyticsTag()} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
