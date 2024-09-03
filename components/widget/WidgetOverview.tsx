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
        <div data-aos="fade-up" className="bg-white dark:bg-true-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-none transform transition-transform duration-500 hover:scale-105">
            <div className="flex flex-col items-start p-6 h-full justify-between">
                <div className="text-5xl animate-wave">👋</div>
                <div className="text-lg font-semibold space-y-1">
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
    const latestMemos = memosData ? memosData.map((memo: any, index: number) => {
        // 处理图片标签，添加🖼️符号
        const contentWithEmoji = memo.content.replace(/<img.*?>/g, '🖼️');

        // 处理<a>标签，隐藏链接文本
        const content = contentWithEmoji.replace(/<a.*?>.*?<\/a>/g, '🔗');

        // 确保文本在一行内显示，多余部分用省略号表示
        return {
            id: memo.id,
            content: `${index + 1}. ${content.length > 50 ? content.slice(0, 50) + '...🖼️' : content}`
        };
    }) : [];

    return (
        <div data-aos="fade-up" className={`bg-white dark:bg-true-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-none transform transition-transform duration-500 hover:scale-105 ${fix ? "h-40 lg:h-44" : "h-48 lg:h-52"}`}>
            <div className="flex flex-col p-6 h-full justify-between space-y-4">
                <div className="flex flex-row items-start justify-between">
                    <div className="text-5xl lg:text-6xl animate-wave">👋</div>
                    <div className="flex flex-col ml-4 w-full">
                        <h2 className="text-xl lg:text-2xl font-bold mb-3">最新说说</h2>
                        <div className="space-y-2 overflow-y-auto h-24 border border-gray-300 dark:border-gray-700 rounded-lg p-2">
                            {latestMemos.map((memo: any) => (
                                <div key={memo.id} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 mb-1 truncate whitespace-nowrap">
                                    {memo.content}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-lg lg:text-2xl font-semibold space-y-1">
                    <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                    <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                    <p className={`${Colors["blue"]?.text.normal}`}>{categoryCount} 个归档</p>
                </div>
            </div>
        </div>
    );
}
