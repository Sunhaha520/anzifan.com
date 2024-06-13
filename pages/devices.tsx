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
        img: "https://www.xiaoayu.ren/goods/xiaomi12x.webp",
        description: "一台强大的笔记本电脑，适合开发和设计工作。"
    },
    {
        name: "iPhone 12",
        img: "https://www.xiaoayu.ren/goods/songxia.webp",
        description: "一款功能强大的智能手机，拍照和性能都很出色。"
    },
    {
        name: "Apple Watch",
        img: "https://www.xiaoayu.ren/goods/airpod3.webp",
        description: "一款方便的智能手表，可以帮助跟踪健康和通知。"
    },
    // 添加更多设备信息
]

const DeviceCard: FC<DeviceType> = device => {
    return (
        <div className="flex items-center justify-center transition duration-200 ease-in-out transform bg-white shadow-lg h-55 lg:h-58 rounded-3xl hover:scale-105">
            <div className="flex flex-col items-center justify-between h-full p-5">
                <div className="w-20 h-20 rounded-full bg-true-gray-200 relative overflow-hidden">
                    <Image layout='fill' objectFit="cover" src={device.img} alt={device.name} />
                </div>
                <div className="pb-2 text-center">
                    <p className="leading-4">{device.name}</p>
                    <div className="mt-1 text-sm text-true-gray-400">
                        {device.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Devices: NextPage = () => {

    return (
        <ListLayout>
            <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">我的数码设备</h1>
            <div className="grid grid-cols-2 gap-4 my-6 md:grid-cols-4 lg:grid-cols-5">
                {devices.map((device: DeviceType) => <DeviceCard key={device.name} {...device} />)}
            </div>
        </ListLayout>
    )
}

export default Devices
