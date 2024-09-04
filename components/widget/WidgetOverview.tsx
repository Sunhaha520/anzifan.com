import { FC, useEffect } from "react";
import useSWR from 'swr';
import { Colors } from "../../lib/colors";

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

export const WidgetOverViewSmall: FC<{ posts: any[] }> = ({ posts }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
    const count = 0;
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );

    const categoryCount = 5;

    return (
        <div data-aos="fade-up">
            <div className="aspect-square overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100" dark="border-true-gray-900 border-none">
                <div className="flex flex-row justify-between h-full bg-white shadow-sm p-3.5" dark="bg-true-gray-900">
                    <div className="flex flex-col justify-between">
                        <div className="w-12 xs:text-[40px] animate-wave inline origin-bottom-right text-3xl">
                            👋
                        </div>
                        <div className="xs:text-xl leading-4 xs:leading-6 font-semibold text-sm">
                            <p className={`${Colors["orange"]?.text.normal} line-clamp-1`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal} line-clamp-1`}>{tagsAmount} 个话题</p>
                            <p className={`${Colors["blue"]?.text.normal} line-clamp-1`}>{categoryCount} 个归档</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const WidgetOverViewMedium: FC<{ posts: any[], fix?: boolean }> = ({ posts, fix }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
    const count = 0;
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );

    const categoryCount = 5;

    useEffect(() => {
        const loadPoem = () => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/js-heo@1.0.11/poem/jinrishici.js';
            script.charset = 'utf-8';
            script.onload = () => {
                (window as any).jinrishici.load((result: any) => {
                    const sentence = document.querySelector("#poem_sentence") as HTMLElement;
                    const author = document.querySelector("#poem_author") as HTMLElement;
                    const dynasty = document.querySelector("#poem_dynasty") as HTMLElement;

                    const sentenceText = result.data.content.slice(0, -1); // Remove last character
                    if (sentence) sentence.innerHTML = sentenceText;
                    if (dynasty) dynasty.innerHTML = result.data.origin.dynasty;
                    if (author) author.innerHTML = `${result.data.origin.author}《${result.data.origin.title}》`;
                });
            };
            document.body.appendChild(script);
        };

        loadPoem();
    }, []);

    return (
        <div data-aos="fade-up">
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100`} dark="border-true-gray-900 border-none">
                <div className="flex flex-row justify-between h-full bg-white shadow-sm px-3 py-2 lg:(px-4 py-3)" dark="bg-true-gray-900">
                    <div className="flex flex-col justify-between w-1/3">
                        <div className={`text-4xl ${fix ? "" : "lg:text-5xl"} animate-wave inline origin-bottom-right w-12`}>
                            👋
                        </div>
                        <div className={`text-lg leading-6 md:leading-7 ${fix ? "" : "lg:text-2xl"} font-semibold`}>
                            <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                            <p className={`${Colors["blue"]?.text.normal}`}>{categoryCount} 个归档</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between ml-4 w-2/3 h-90%">
                        <div className="text-sm font-medium">
                            <div id="poem_sentence" className="mb-1 text-center p-4 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-3xl flex items-center justify-center h-full text-lg overflow-hidden break-words" style={{ fontSize: 'clamp(12px, 2vw, 24px)', height: '60px', lineHeight: '1.2', display: 'block', textOverflow: 'ellipsis', whiteSpace: 'normal', overflow: 'hidden', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
                                <span className="text-2xl">“</span>
                                <span id="poem_sentence_text" className="text-2xl"></span>
                                <span className="text-2xl">”</span>
                            </div>
                            <div id="poem_info" className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                                <div id="poem_dynasty" className="bg-red-500 text-white rounded-full px-2 py-1 inline-block mr-2"></div>
                                <div id="poem_author" className="text-gray-500 dark:text-gray-400"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
