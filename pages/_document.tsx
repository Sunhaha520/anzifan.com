import { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'


export default function Document() {
    const getBaiduAnalyticsTag = () => {
        return {
            __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?1d92f704ac9e5a918b2d74755f6d218a";
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
                {/* Coze Chat SDK */}
        <script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/cn/index.js" />
        <script dangerouslySetInnerHTML={{
          __html: `
            new CozeWebSDK.WebChatClient({
              config: {
                bot_id: '7454868265346121740',
              },
              componentProps: {
                title: 'Coze',
              },
            });
          `
        }} />
            </body>
        </Html>
    )
}
