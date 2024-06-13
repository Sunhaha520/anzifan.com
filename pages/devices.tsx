import { NextPage } from "next"
import ListLayout from "../components/layout/ListLayout"
import { FC } from "react"
import Image from 'next/image'

interface DeviceType {
    name: string;
    img: string;
    description: string;
}

const devices: DeviceType[] = [
    {
        name: "MacBook Pro",
        img: "https://cdn.dribbble.com/userupload/15091244/file/original-02cd3874e0498a86ab2f7e69d16805b1.webp",
        description: "一台强大的笔记本电脑，适合开发和设计工作。"
    },
    {
        name: "iPhone 12",
        img: "https://cdn.dribbble.com/userupload/15091241/file/original-85eba33649b2de99236f1972d65fbaa2.webp",
        description: "一款功能强大的智能手机，拍照和性能都很出色。"
    },
    {
        name: "Apple Watch",
        img: "https://cdn.dribbble.com/userupload/15091243/file/original-966eb4bc3cfa459eb393ca2f42966168.webp",
        description: "一款方便的智能手表，可以帮助跟踪健康和通知。"
    },
    // 添加更多设备信息
]

const DeviceCard: FC<DeviceType> = ({ name, img, description }) => {
    return (
        <div className="transition duration-200 ease-in-out transform bg-white shadow-lg rounded-3xl hover:scale-105 dark:bg-true-gray-900">
            <div className="relative w-full h-40 bg-true-gray-200 rounded-t-3xl overflow-hidden dark:bg-true-gray-600">
                <Image layout='fill' objectFit="cover" src={img} alt={name} className="object-cover" />
            </div>
            <div className="flex flex-col items-center justify-between h-full p-5">
                <div className="text-center">
                    <p className="leading-4 dark:text-white">{name}</p>
                    <div className="mt-1 text-sm text-true-gray-400 dark:text-true-gray-300">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Devices: NextPage = () => {

    return (
        <ListLayout>
            <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8 dark:text-white">我的数码设备</h1>
            <div className="grid grid-cols-2 gap-4 my-6 md:grid-cols-4 lg:grid-cols-5">
                {devices.map((device: DeviceType) => <DeviceCard key={device.name} {...device} />)}
            </div>
        </ListLayout>
    )
}

export default Devices
