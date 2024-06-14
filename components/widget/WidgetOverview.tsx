import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { links, LinkType } from "../../config/links";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Colors } from "../../lib/colors";
import gradient from "chartjs-plugin-gradient";
import { Tooltip } from "../utility/Tooltip";
import { GetStaticProps } from "next";
import { getDatabase } from "../../lib/notion";
import { Post } from "../../lib/types";
import { useTheme } from "next-themes";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    gradient
);

export const WidgetOverViewSmall: FC<{ posts: Post[], }> = ({ posts }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
    const count = 0;
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );

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
                            <p className={`${Colors["blue"]?.text.normal} line-clamp-1`}>25,223 次访问</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const WidgetOverViewMedium: FC<{ posts: Post[], fix?: boolean }> = ({ posts, fix }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
    const count = 0;
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );
    const monthPosts = dateMap.map(d => `${d.date.getFullYear()}-${(d.date.getMonth()).toString()}-${(d.date.getDate()) <= 15 ? "0" : "1"}`);
    const currentMonth = { year: new Date().getFullYear(), month: (new Date().getMonth()) }
    let previousMonthMapArray = [];
    for (let i = 0; i < 12; ++i) {
        const previousMonth = new Date(currentMonth.year, currentMonth.month - i);
        previousMonthMapArray.push({ date: `${previousMonth.getFullYear()}-${(previousMonth.getMonth()).toString()}-1`, count: 0 });
        previousMonthMapArray.push({ date: `${previousMonth.getFullYear()}-${(previousMonth.getMonth()).toString()}-0`, count: 0 });
    }
    previousMonthMapArray.reverse().map(post => {
        monthPosts.filter(p => {
            if (p === post.date) {
                post.count += 1;
            }
        });
    });

    const postsDataset = previousMonthMapArray.map(p => p.count != 0 ? 1 : 0);

    const monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let todayMonth = new Date().getMonth();
    const monthLabel = [monthArray[todayMonth - 12 < 0 ? todayMonth : todayMonth - 12], "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth - 6 < 0 ? todayMonth - 6 + 12 : todayMonth - 6], "", "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth]];

    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const ticksColor = monthLabel.map((label, index) =>
        parseInt(label) >= todayMonth + 1 && index != 23 ? resolvedTheme === "dark" ? "#434343" : "#bababa" : resolvedTheme === "dark" ? "#ffffff" : "#000000"
    );

    const postsData: any = {
        labels: monthLabel,
        datasets: [
            {
                data: postsDataset,
                borderRadius: Number.MAX_VALUE,
                borderSkipped: false,
                barPercentage: 1,
                gradient: {
                    backgroundColor: {
                        axis: 'y',
                        colors: {
                            0: 'rgba(255, 149, 0, 1)',
                            100: 'rgba(255, 149, 0, 0.5)',
                        }
                    },
                }
            }
        ]
    }

    const postsOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: {
                afterFit: (axis: any) => {
                    axis.paddingRight = 1;
                    axis.paddingLeft = 1;
                    axis.paddingTop = 6.5;
                },
                grid: {
                    drawTicks: false,
                    drawBorder: false,
                    lineWidth: 1,
                },
                ticks: {
                    padding: 5,
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    color: ticksColor,
                    borderWidth: 10,
                    font: {
                        size: 7,
                        lineHeight: 1,
                    }
                }
            },
            yAxes: {
                grid: {
                    drawOnChartArea: false,
                    drawTicks: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false,
                }
            }
        }
    }

    return (
        <div data-aos="fade-up">
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100`} dark="border-true-gray-900 border-none">
                <div className="flex flex-row justify-between h-full bg-white shadow-sm px-3 py-2 lg:px-4 lg:py-3" dark="bg-true-gray-900">
                    <div className="flex flex-col justify-between">
                        <div className={`text-4xl ${fix ? "" : "lg:text-5xl"} animate-wave inline origin-bottom-right w-12`}>
                            👋
                        </div>
                        <div className={`text-lg leading-6 md:leading-7  ${fix ? "" : "lg:text-2xl"} font-semibold`}>
                            <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                            <p className={`${Colors["blue"]?.text.normal}`}>25,223 次访问</p>
                        </div>
                    </div>
                    <div className="text-xs w-6/11 lg:w-1/2 lg:text-md lg:text-sm font-medium h-full flex flex-col justify-between">
                        <div>
                            <p className="mb-2">访客</p>
                            <div>
                                <p className={`${Colors["blue"]?.text.normal}`}>2,500</p>
                            </div>
                        </div>
                        <div>
                            <p className="mb-2">访问</p>
                            <div>
                                <p className={`${Colors["blue"]?.text.normal}`}>25,223</p>
                            </div>
                        </div>
                        <div>
                            <p>文章</p>
                            <div className="h-6.8 md:h-6.6 lg:h-7.3">
                                <Bar options={postsOptions} data={postsData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
