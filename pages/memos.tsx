import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/memos.module.css';

const Memos: NextPage = () => {
    const [memos, setMemos] = useState<any[]>([]);

    useEffect(() => {
        fetch('/memos.json')
            .then(response => response.json())
            .then(data => setMemos(data))
            .catch(error => console.error('Error fetching memos:', error));

        if (typeof window !== 'undefined') {
            // [Safari only] gesturestart event: multi finger gestures touching
            window.addEventListener('gesturestart', function(event) {
                event.preventDefault();
            });
        }
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
                <link rel="manifest" href="public/manifest.json" />
                <link rel="apple-touch-startup-image" href="public/pwa/splash-2048x2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                <link rel="apple-touch-startup-image" href="public/pwa/splash-2732x2048.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                {/* 添加其他 apple-touch-startup-image 链接 */}
                <title>MemoBBS</title>
                <link rel="stylesheet" href="public/cdn/APlayer.min.css" />
                <link rel="stylesheet" href="public/cdn/animate.min.css" />
                <link rel="stylesheet" href="public/cdn/ArtalkLite.css" />
                <link rel="stylesheet" href="public/grid.css" />
                <link rel="stylesheet" href="public/memos.css" />
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
            </body>
        </>
    );
}

export default Memos;
