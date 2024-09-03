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
        <div data-aos="fade-up" className="bg-white dark:bg-true-gray-900 rounded-3xl shadow-lg transform transition-transform duration-500 hover:scale-105">
            <div className="flex flex-col p-6 h-full justify-between space-y-4">
                <div className="text-4xl lg:text-5xl animate-wave mb-4">👋</div>
                <div className="text-lg lg:text-2xl font-semibold space-y-1">
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
    const latestMemos = memosData ? memosData.slice(0, 4).map((memo: any, index: number) => {
        const contentWithEmoji = memo.content.replace(/<img.*?>/g, '🖼️');
        const content = contentWithEmoji.replace(/<a.*?>.*?<\/a>/g, '🔗');
        return {
            id: memo.id,
            content: `${index + 1}. ${content.length > 50 ? content.slice(0, 50) + '...🖼️' : content}`
        };
    }) : [];

    return (
        <div data-aos="fade-up" className="bg-white dark:bg-true-gray-900 rounded-3xl shadow-lg transform transition-transform duration-500 hover:scale-105 h-48 lg:h-52">
            <div className="flex flex-row p-6 h-full justify-between">
                <div className="flex flex-col justify-between">
                    <div className="text-4xl lg:text-5xl animate-wave mb-4">👋</div>
                    <div className="text-lg lg:text-2xl font-semibold space-y-1">
                        <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                        <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                        <p className={`${Colors["blue"]?.text.normal}`}>{categoryCount} 个归档</p>
                    </div>
                </div>
                <div className="flex flex-col ml-4 w-full" style={{ maxWidth: '50%' }}>
                    <h2 className="text-lg lg:text-2xl font-bold mb-3">最新说说</h2>
                    <div className="space-y-2">
                        {latestMemos.map((memo: any) => (
                            <div key={memo.id} className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 mb-1 truncate whitespace-nowrap relative transform transition-transform duration-500 hover:scale-105">
                                <strong>{memo.content.split('.')[0]}.</strong> {memo.content.split('.').slice(1).join('.')}
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-300 dark:bg-pink-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
