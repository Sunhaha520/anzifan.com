import { FC, useEffect } from "react";
import { Colors } from "../../lib/colors";
import { Post } from "../../lib/types";

export const WidgetOverViewMedium: FC<{ posts: Post[], fix?: boolean }> = ({ posts, fix }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
    const count = 0;
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );

    const categoryCount = 5;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/js-heo@1.0.11/poem/jinrishici.js";
        script.charset = "utf-8";
        script.onload = () => {
            (window as any).jinrishici.load((result: any) => {
                const sentence = document.querySelector("#poem_sentence");
                const author = document.querySelector("#poem_author");
                const dynasty = document.querySelector("#poem_dynasty");

                if (sentence && author && dynasty) {
                    let sentenceText = result.data.content;
                    sentenceText = sentenceText.substr(0, sentenceText.length - 1);
                    sentence.innerHTML = sentenceText;
                    dynasty.innerHTML = result.data.origin.dynasty;
                    author.innerHTML = `${result.data.origin.author}《${result.data.origin.title}》`;
                }
            });
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div data-aos="fade-up">
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100`} dark="border-true-gray-900 border-none">
                <div className="flex flex-row justify-between h-full bg-white shadow-sm px-3 py-2 lg:px-4 lg:py-3" dark="bg-true-gray-900">
                    {/* 左侧部分 */}
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

                    {/* 右侧部分：诗歌组件 */}
                    <div id="middle" className="flex flex-col justify-center w-2/3">
                        <div id="card-poem" className="bg-white shadow-sm p-4 rounded-xl dark:bg-true-gray-900">
                            <div id="poem_sentence" className="text-center font-serif line-height-1.4 mb-2 p-4 rounded-xl bg-gray-200 min-h-[62px]"></div>
                            <div id="poem_info" className="flex justify-end text-xs mt-2 text-gray-600 dark:text-gray-300">
                                <div id="poem_dynasty" className="px-2 py-1 bg-gray-400 text-white rounded-md mr-2"></div>
                                <div id="poem_author"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
