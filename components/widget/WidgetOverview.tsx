import { FC } from "react";
import useSWR from 'swr';
import Link from 'next/link';
import { Colors } from "../../lib/colors";

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

export const WidgetOverViewSmall: FC<{ posts: any[] }> = ({ posts }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
    const count = 0;
    const tagsAmount = tagsMap.reduce((prev, cur) => prev + cur.tags.length, count);
    const categoryCount = 5;

    return (
        <div data-aos="fade-up">
            <div className="aspect-square overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100 dark:border-true-gray-900 dark:border-none">
                <div className="flex flex-row justify-between h-full bg-white shadow-sm p-3.5 dark:bg-true-gray-900">
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
    );
}

export const WidgetOverViewMedium: FC<{ posts: any[], fix?: boolean }> = ({ posts, fix }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
    const count = 0;
    const tagsAmount = tagsMap.reduce((prev, cur) => prev + cur.tags.length, count);
    const categoryCount = 5;

    const { data: memosData } = useSWR('https://tgapi.xiaoayu.eu.org/?tag=SFCN&limit=5&type=memos', fetcher);
    const latestMemos = memosData ? memosData.slice(0, 4).map((memo: any, index: number) => {
        const contentWithEmoji = memo.content.replace(/<img.*?>/g, '🖼️');
        const content = contentWithEmoji.replace(/<a.*?>.*?<\/a>/g, '🔗');
        return {
            id: memo.id,
            content: `${index + 1}. ${content.length > 50 ? content.slice(0, 50) + '...🖼️' : content}`
        };
    }) : [];

    return (
        <div data-aos="fade-up">
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100 dark:border-true-gray-900 dark:border-none ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"}`}>
                <div className="flex flex-row justify-between h-full bg-white shadow-sm px-3 py-2 lg:px-4 lg:py-3 dark:bg-true-gray-900">
                    <div className="flex flex-col justify-between">
                        <div className={`text-4xl ${fix ? "" : "lg:text-5xl"} animate-wave inline origin-bottom-right w-12`}>
                            👋
                        </div>
                        <div className={`text-lg leading-6 md:leading-7 ${fix ? "" : "lg:text-2xl"} font-semibold`}>
                            <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                            <p className={`${Colors["blue"]?.text.normal}`}>{categoryCount} 个归档</p>
                        </div>
                    </div>
                    <div className="text-xs w-6/11 lg:w-1/2 lg:text-md lg:text-sm font-medium h-full flex flex-col justify-between">
                        <Link href="/bibi">
                            <a className="text-lg lg:text-2xl font-bold mb-3 transform transition-transform duration-500 hover:scale-105">最新说说</a>
                        </Link>
                        <div className="space-y-2">
                            {latestMemos.map((memo: any) => (
                                <div key={memo.id} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-1 truncate whitespace-nowrap relative" style={{ fontSize: '2vw', lineHeight: '2.5vw' }}>
                                    <strong>{memo.content.split('.')[0]}.</strong> {memo.content.split('.').slice(1).join('.')}
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-300 dark:bg-pink-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
