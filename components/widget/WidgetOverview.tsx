import { FC } from "react";
import useSWR from 'swr';
import { Colors } from "../../lib/colors";

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

export const WidgetOverViewSmall: FC<{ posts: any[] }> = ({ posts }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
    const count = 0;
    const tagsAmount = tagsMap.reduce((prev, cur) => prev + cur.tags.length, count);
    const categoryCount = 5;

    return (
        <div data-aos="fade-up" className="bg-white dark:bg-true-gray-900 rounded-3xl shadow-sm border-[0.5px] dark:border-none border-true-gray-100 hover:scale-105 hover:shadow-lg transform transition-all duration-500">
            <div className="flex flex-col items-start p-4 h-full justify-between">
                <div className="text-4xl animate-wave">👋</div>
                <div className="text-lg font-semibold">
                    <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                    <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                    <p className={`${Colors["blue"]?.text.normal}`}>{categoryCount} 个归档</p>
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
    const latestMemos = memosData ? memosData.map((memo: any) => {
        const content = memo.content.replace(/<img.*?>/g, '🖼️');
        return {
            id: memo.id,
            content: content.length > 50 ? content.slice(0, 50) + '...' : content
        };
    }) : [];

    return (
        <div data-aos="fade-up" className={`bg-white dark:bg-true-gray-900 rounded-3xl shadow-sm border-[0.5px] dark:border-none border-true-gray-100 ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} hover:scale-105 hover:shadow-lg transform transition-all duration-500`}>
            <div className="flex flex-col p-4 h-full justify-between">
                <div className="flex flex-row items-start justify-between">
                    <div className="text-4xl lg:text-5xl animate-wave">👋</div>
                    <div className="flex flex-col ml-4">
                        <h2 className="text-xl font-bold mb-2">最新说说</h2>
                        {latestMemos.map((memo: any) => (
                            <div key={memo.id} className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                                {memo.content}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-lg lg:text-2xl font-semibold mt-4">
                    <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                    <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                    <p className={`${Colors["blue"]?.text.normal}`}>{categoryCount} 个归档</p>
                </div>
            </div>
        </div>
    );
}
