import { FC, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { links, LinkType } from "../../config/links";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    BarElement,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Colors } from "../../lib/colors";
import gradient from "chartjs-plugin-gradient";
import { Tooltip } from "../utility/Tooltip";
import { GetStaticProps } from "next";
import { getDatabase } from "../../lib/notion";
import { Post } from "../../lib/types";
import useSWRImmutable from 'swr/immutable';
import { useTheme } from "next-themes";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    gradient
);

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

const useWidgetData = (posts: Post[]) => {
    const tagsMap = useMemo(() => posts.map(p => ({ tags: p.tags, date: p.updateDate })), [posts]);
    const dateMap = useMemo(() => posts.map(p => ({ date: new Date(p.updateDate) })), [posts]);
    const count = 0;
    const tagsAmount = useMemo(() => tagsMap.reduce((prev, cur) => prev + cur.tags.length, count), [tagsMap]);

    const [visitCount, setVisitCount] = useState(5000);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const busuanziValue = document.getElementById('busuanzi_value_site_pv');
            if (busuanziValue) {
                const busuanziCount = parseInt(busuanziValue.innerText, 10);
                setVisitCount(prevCount => prevCount + busuanziCount);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return { tagsMap, dateMap, tagsAmount, visitCount };
};

export const WidgetOverViewSmall: FC<{ posts: Post[] }> = ({ posts }) => {
    const { tagsAmount, dateMap, visitCount } = useWidgetData(posts);

    return (
        <div data-aos="fade-up">
            <div className="aspect-square overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100" dark="border-true-gray-900 border-none">
                <div className="flex flex-row justify-between h-full bg-white shadow-sm p-3.5 " dark="bg-true-gray-900">
                    <div className="flex flex-col justify-between">
                        <div className="w-12 xs:text-[40px] animate-wave inline origin-bottom-right text-3xl">
                            👋
                        </div>
                        <div className="xs:text-xl leading-4 xs:leading-6 font-semibold text-sm">
                            <p className={`${Colors["orange"]?.text.normal} line-clamp-1`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal} line-clamp-1`}>{tagsAmount} 个话题</p>
                            <p className={`${Colors["blue"]?.text.normal} line-clamp-1`}>{visitCount} 次访问</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const WidgetOverViewMedium: FC<{ posts: Post[], fix?: boolean }> = ({ posts, fix }) => {
    const { tagsAmount, dateMap, visitCount } = useWidgetData(posts);

    return (
        <div data-aos="fade-up">
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100`} dark="border-true-gray-900 border-none">
                <div className="flex flex-row justify-between h-full bg-white shadow-sm px-3 py-2  lg:(px-4 py-3)" dark="bg-true-gray-900">
                    <div className="flex flex-col justify-between">
                        <div className={`text-4xl ${fix ? "" : "lg:text-5xl"} animate-wave inline origin-bottom-right w-12`}>
                            👋
                        </div>
                        <div className={`text-lg leading-6 md:leading-7  ${fix ? "" : "lg:text-2xl"} font-semibold`}>
                            <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                            <p className={`${Colors["blue"]?.text.normal}`}>{visitCount} 次访问</p>
                        </div>
                    </div>
                    <div className="text-xs w-6/11 lg:(w-1/2 text-md) lg<:text-sm font-medium h-full flex flex-col justify-between">
                        <div>
                            <p className="mb-2">访客</p>
                            <div>
                                <OverviewUv />
                            </div>
                        </div>
                        <div>
                            <p className="mb-2">访问</p>
                            <OverviewPv />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OverviewPv = () => {
    const [visitCount, setVisitCount] = useState(5000);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const busuanziValue = document.getElementById('busuanzi_value_site_pv');
            if (busuanziValue) {
                const busuanziCount = parseInt(busuanziValue.innerText, 10);
                setVisitCount(prevCount => prevCount + busuanziCount);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    let pv = [9, 179, 78, 171, 109, 51, 97, 71, 59, 39, 41, 39, 60, 44, 65, 51, 80, 60, 97, 153, 4, 4, 42, 26, 72, 40, 92, 16, 21, 26, 38, 34, 43, 23, 30, 40, 21, 14, 74, 32, 46, 35, 84, 69, 45, 25, 85, 84, 85, 46, 53, 156, 62];

    return (
        <Tooltip tooltipText={`⬇️${Math.min(...getTrimData(pv).last48)} ⬆️${Math.max(...getTrimData(pv).last48)} (周)`}>
            <BarChart data={pv} color="0, 122, 255" />
        </Tooltip>
    );
};

const OverviewUv = () => {
    const [visitCount, setVisitCount] = useState(5000);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const busuanziValue = document.getElementById('busuanzi_value_site_pv');
            if (busuanziValue) {
                const busuanziCount = parseInt(busuanziValue.innerText, 10);
                setVisitCount(prevCount => prevCount + busuanziCount);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    let uv = [8, 52, 45, 51, 54, 34, 46, 35, 37, 29, 34, 33, 36, 40, 51, 39, 50, 33, 53, 23, 4, 3, 16, 22, 32, 27, 31, 14, 12, 21, 15, 18, 18, 18, 15, 25, 13, 13, 25, 14, 25, 23, 44, 42, 28, 16, 26, 47, 58, 43, 36, 45, 36];

    return (
        <Tooltip tooltipText={`⬇️${Math.min(...getTrimData(uv).last48)} ⬆️${Math.max(...getTrimData(uv).last48)} (周)`}>
            <BarChart data={uv} color="255, 45, 85" />
        </Tooltip>
    );
};

function getTrimData(originalData: Array<number>, color?: any) {
    const last48 = originalData.slice(Math.max(originalData.length - 48, 0));
    const lowest = Math.max(...last48) / 7;
    const trimLast48 = last48.map((v: any) => v > lowest ? v : lowest);
    const odd = trimLast48.filter((c: any, i: number) => i % 2);
    const even = trimLast48.filter((c: any, i: number) => !(i % 2));
    let colors: any = { 0: `rgba(${color}, 0.8)` };
    colors[Math.max(...last48)] = `rgba(${color}, 0.4)`;

    return { odd, even, colors, last48 };
}

function createDataset(data: Array<number>, color: any) {
    return {
        data: data,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        backgroundColor: "rgba(0, 122, 255, 0.8)",
        barPercentage: 0.8,
        categoryPercentage: 0.95,
        gradient: {
            backgroundColor: {
                axis: 'y',
                colors: color
            },
        }
    };
}

const BarChart = ({ data, color }: { data: number[], color: string }) => {
    const monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let todayMonth = new Date().getMonth();

    const monthLabel = [monthArray[todayMonth - 12 < 0 ? todayMonth : todayMonth - 12], "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth - 6 < 0 ? todayMonth - 6 + 12 : todayMonth - 6], "", "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth]];

    function barData(data: any, color: any): any {
        return (
            {
                labels: monthLabel,
                datasets: [
                    createDataset(getTrimData(data).odd, getTrimData(data, color).colors),
                    createDataset(getTrimData(data).even, getTrimData(data, color).colors),
                ],
            }
        );
    };

    function barOptions(data: any): any {
        return ({
            responsive: true,
            borderRadius: Number.MAX_VALUE,
            scales: {
                xAxis: {
                    afterFit: (axis: any) => {
                        axis.paddingRight = 1;
                        axis.paddingLeft = 1;
                    },
                    grid: {
                        drawBorder: false,
                        drawTicks: false,
                    },
                    ticks: {
                        display: false,
                        autoSkip: false,
                        maxRotation: 0,
                        font: {
                            size: 8,
                            lineHeight: 0.5,
                        }
                    }
                },
                yAxis: {
                    min: Math.min(...getTrimData(data).last48) - 5,
                    max: Math.max(...getTrimData(data).last48) + 5,
                    grid: {
                        drawOnChartArea: false,
                        drawTicks: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                        stepSize: Math.max(...getTrimData(data).last48),
                        font: {
                            size: 8,
                        }
                    }
                }
            }
        });
    }
    return <Bar className="" data={barData(data, color)} options={barOptions(data)} width="100%" height="12" />;
};

export default { WidgetOverViewSmall, WidgetOverViewMedium, OverviewPv, OverviewUv, BarChart };
