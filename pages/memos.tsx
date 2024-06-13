import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Memos: NextPage = () => {
    const [memos, setMemos] = useState<any[]>([]);

    useEffect(() => {
        fetch('/memos.json')
            .then(response => response.json())
            .then(data => setMemos(data))
            .catch(error => console.error('Error fetching memos:', error));
    }, []);

    return (
        <>
            <Head>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <meta charSet="UTF-8" />
                <meta name="renderer" content="webkit" />
                <meta name="force-rendering" content="webkit" />
                <meta name="referrer" content="no-referrer" />
                <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-touch-fullscreen" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-startup-image" href="/pwa/splash-2048x2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="/pwa/splash-2732x2048.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                {/* 添加其他 apple-touch-startup-image 链接 */}
                <title>MemoBBS</title>
                <link rel="stylesheet" href="/cdn/APlayer.min.css" />
                <link rel="stylesheet" href="/cdn/animate.min.css" />
                <link rel="stylesheet" href="/cdn/ArtalkLite.css" />
                <link rel="stylesheet" href="/grid.css" />
                <link rel="stylesheet" href="/memos.css" />
                <style>{`
                    html, body {
                        touch-action: manipulation;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: var(--light-background);
                        color: #222;
                        color: var(--light-color);
                        font-weight: 400;
                        font-size: 1.1rem;
                        font-family: "HarmonyOS_Regular","PingFangSC-Regular", "PingFang SC", "Microsoft YaHei", Arial, Helvetica, "WenQuanYi Micro Hei", "tohoma,sans-serif";
                        line-height: 1.5;
                        text-rendering: optimizeLegibility;
                        -webkit-overflow-scrolling: touch;
                        -webkit-text-size-adjust: 100%;
                    }
                    body.dark-theme {
                        background-color: var(--dark-background);
                        color: #a9a9b3;
                        color: var(--dark-color);
                    }
                    h1 {font-size: 1.5rem;}
                    a {
                        outline: none;
                        background-color: transparent;
                        color: var(--light-color);
                        text-decoration: none;
                        cursor: pointer;
                        -webkit-transition: all 0.3s linear;
                        transition: all 0.3s linear;
                        -webkit-text-decoration-skip: objects;
                    }
                    .dark-theme a {
                        color: var(--dark-color);
                    }
                `}</style>
            </Head>
            <body className="">
                <div className="container pt-4">
                    <div id="memos"></div>
                    <div id="memo-list">
                        {memos.map((memo, index) => (
                            <div key={index} className="memo-item">
                                <h2>{memo.creatorName}</h2>
                                <p>{memo.content}</p>
                                <a href={memo.link} target="_blank" rel="noopener noreferrer">Visit</a>
                            </div>
                        ))}
                    </div>
                </div>
                <script type="text/javascript">
                    // [Safari only] gesturestart event: multi finger gestures touching
                    document.addEventListener('gesturestart', function(event) {
                        event.preventDefault();
                    });
                </script>
            </body>
        </>
    );
}

export default Memos;
