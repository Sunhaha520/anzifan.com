import { FC, useEffect, useState } from "react"
import Image from "next/image"
import { links, LinkType } from "../../config/links"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,

    Title,
    // Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Colors } from "../../lib/colors"
// TODO: gradient is too big
import gradient from "chartjs-plugin-gradient"
import { Tooltip } from "../utility/Tooltip"
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
    // Tooltip,
    // Legend
);

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

export const WidgetOverViewSmall: FC<{ posts: Post[], }> = ({ posts }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }))
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }))
    const count = 0
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );

    return (
        <div data-aos="fade-up">
            <div className="aspect-square overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100" dark="border-true-gray-900 border-none"
            // data-aos="fade-up"
            >
                <div className="flex flex-row justify-between h-full bg-white shadow-sm p-3.5 " dark="bg-true-gray-900"
                // data-aos="fade-up"         
                >
                    <div className="flex flex-col justify-between">
                        <div className="w-12 xs:text-[40px] animate-wave inline origin-bottom-right text-3xl">
                            👋
                        </div>
                        <div className="xs:text-xl leading-4 xs:leading-6 font-semibold text-sm">
                            <p className={`${Colors["orange"]?.text.normal} line-clamp-1`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal} line-clamp-1`}>{tagsAmount} 个话题</p>
                            <OverviewPvAll />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const WidgetOverViewMedium: FC<{ posts: Post[], fix?: boolean }> = ({ posts, fix }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }))
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }))
    const count = 0
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );
    const monthPosts = dateMap.map(d => `${d.date.getFullYear()}-${(d.date.getMonth()).toString()}-${(d.date.getDate()) <= 15 ? "0" : "1"}`);
    const currentMonth = { year: new Date().getFullYear(), month: (new Date().getMonth()) }
    let previousMonthMapArray = []
    for (let i = 0; i < 12; ++i) {
        const previousMonth = new Date(currentMonth.year, currentMonth.month - i)
        previousMonthMapArray.push({ date: `${previousMonth.getFullYear()}-${(previousMonth.getMonth()).toString()}-1`, count: 0 })
        previousMonthMapArray.push({ date: `${previousMonth.getFullYear()}-${(previousMonth.getMonth()).toString()}-0`, count: 0 })
    }
    previousMonthMapArray.reverse().map(post => {
        monthPosts.filter(p => {
            if (p === post.date) {
                post.count += 1
            }
        })
    })

    const postsDataset = previousMonthMapArray.map(p => p.count != 0 ? 1 : 0)

    const monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    // const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let todayMonth = new Date().getMonth();
    const monthLabel = [monthArray[todayMonth - 12 < 0 ? todayMonth : todayMonth - 12], "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth - 6 < 0 ? todayMonth - 6 + 12 : todayMonth - 6], "", "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth]]

    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const ticksColor = monthLabel.map((label, index) =>
        parseInt(label) >= todayMonth + 1 && index != 23 ? resolvedTheme === "dark" ? "#434343":"#bababa" : resolvedTheme === "dark" ? "#ffffff":"#000000"
    )

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
                    // color: ["#bababa","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5"]
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
                        // weight: "bold",
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
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100`} dark="border-true-gray-900 border-none"
            // data-aos="fade-up"
            >
                <div className="flex flex-row justify-between h-full bg-white shadow-sm px-3 py-2  lg:(px-4 py-3)" dark="bg-true-gray-900"
                // data-aos="fade-up"
                >
                    <div className="flex flex-col justify-between">
                        <div className={`text-4xl ${fix ? "" : "lg:text-5xl"} animate-wave inline origin-bottom-right w-12`}>
                            👋
                        </div>
                        <div className={`leading-4 font-semibold ${fix ? "text-sm xs:text-base" : "text-base xs:text-lg"} lg:(text-xl leading-5)`}>
                            <p className={`${Colors["orange"]?.text.normal} line-clamp-1`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal} line-clamp-1`}>{tagsAmount} 个话题</p>
                            <OverviewPvAll />
                        </div>
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center pl-2.5 pr-1.5 pt-1.5">
                        <Bar data={postsData} options={postsOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const WidgetOverViewLarge: FC<{ posts: Post[], fix?: boolean }> = ({ posts, fix }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }))
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }))
    const count = 0
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );
    const monthPosts = dateMap.map(d => `${d.date.getFullYear()}-${(d.date.getMonth()).toString()}-${(d.date.getDate()) <= 15 ? "0" : "1"}`);
    const currentMonth = { year: new Date().getFullYear(), month: (new Date().getMonth()) }
    let previousMonthMapArray = []
    for (let i = 0; i < 12; ++i) {
        const previousMonth = new Date(currentMonth.year, currentMonth.month - i)
        previousMonthMapArray.push({ date: `${previousMonth.getFullYear()}-${(previousMonth.getMonth()).toString()}-1`, count: 0 })
        previousMonthMapArray.push({ date: `${previousMonth.getFullYear()}-${(previousMonth.getMonth()).toString()}-0`, count: 0 })
    }
    previousMonthMapArray.reverse().map(post => {
        monthPosts.filter(p => {
            if (p === post.date) {
                post.count += 1
            }
        })
    })

    const postsDataset = previousMonthMapArray.map(p => p.count != 0 ? 1 : 0)

    const monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    // const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let todayMonth = new Date().getMonth();
    const monthLabel = [monthArray[todayMonth - 12 < 0 ? todayMonth : todayMonth - 12], "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth - 6 < 0 ? todayMonth - 6 + 12 : todayMonth - 6], "", "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth]]

    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const ticksColor = monthLabel.map((label, index) =>
        parseInt(label) >= todayMonth + 1 && index != 23 ? resolvedTheme === "dark" ? "#434343":"#bababa" : resolvedTheme === "dark" ? "#ffffff":"#000000"
    )

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
                    // color: ["#bababa","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5"]
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
                        // weight: "bold",
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
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100`} dark="border-true-gray-900 border-none"
            // data-aos="fade-up"
            >
                <div className="flex flex-row justify-between h-full bg-white shadow-sm px-3 py-2  lg:(px-4 py-3)" dark="bg-true-gray-900"
                // data-aos="fade-up"
                >
                    <div className="flex flex-col justify-between">
                        <div className={`text-4xl ${fix ? "" : "lg:text-5xl"} animate-wave inline origin-bottom-right w-12`}>
                            👋
                        </div>
                        <div className={`leading-4 font-semibold ${fix ? "text-sm xs:text-base" : "text-base xs:text-lg"} lg:(text-xl leading-5)`}>
                            <p className={`${Colors["orange"]?.text.normal} line-clamp-1`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal} line-clamp-1`}>{tagsAmount} 个话题</p>
                            <OverviewPvAll />
                        </div>
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center pl-2.5 pr-1.5 pt-1.5">
                        <Bar data={postsData} options={postsOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const OverviewPvAll = () => {
    const pvAmount = 25223;  // 固定的数字

    return (
        <p className={`${Colors["blue"]?.text.normal} line-clamp-1`}>{pvAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 次访问</p>
    )
}
