import { FC, useEffect } from "react";
import { Colors } from "../../lib/colors";

export const WidgetOverViewMedium: FC<{ posts: any[], fix?: boolean }> = ({ posts, fix }) => {
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
                        <div id="flip-wrapper" className="relative w-full h-full">
                            <div id="flip-content" className="w-full h-full transition-transform duration-300 transform-style preserve-3d">
                                <div className="face absolute w-full h-full backface-hidden bg-cover bg-center" style={{ backgroundImage: 'url(https://img.zhheo.com/i/2022/08/31/630efc6e3e794.png)' }}>
                                </div>
                                <div className="back face absolute w-full h-full transform rotate-y-180 backface-hidden bg-cover bg-center" style={{ backgroundImage: 'url(https://bu.dusays.com/2022/10/30/635e9c6a228a3.png)' }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                #flip-wrapper {
                    perspective: 1000px;
                }

                #flip-content {
                    transform-style: preserve-3d;
                    transition: transform 0.3s cubic-bezier(0, 0, 0, 1.29);
                }

                #flip-wrapper:hover #flip-content {
                    transform: rotateY(180deg);
                }

                .face {
                    backface-visibility: hidden;
                }

                [data-theme='light'] #flip-wrapper {
                    background-color: #57bd6a;
                }
            `}</style>
        </div>
    )
}
