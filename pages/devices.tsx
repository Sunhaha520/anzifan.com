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
        name: "小米 12X",
        img: "https://cdn.dribbble.com/userupload/15091244/file/original-02cd3874e0498a86ab2f7e69d16805b1.webp",
        description: "好用，小巧次旗舰，小团子送我的！我要用好久！。"
    },
    {
        name: "荣耀手环6",
        img: "https://cdn.dribbble.com/userupload/15091241/file/original-85eba33649b2de99236f1972d65fbaa2.webp",
        description: "计步，血氧，睡眠，NFC 通通都有，表盘漂亮。"
    },
    {
        name: "AirPods(第3代)",
        img: "https://cdn.dribbble.com/userupload/15092576/file/original-aa1b97cdf2120a8bf9f16baa76bb0a51.webp",
        description: "小团子买的，我用了一段时间，后来她抢走了。"
    },
    {
        name: "RK-61机械键盘",
        img: "https://cdn.dribbble.com/userupload/15092586/file/original-23482e442454c341cf60ad86024d69e9.webp",
        description: "我对键盘没需求，感觉还不错，京东羊毛19元到手。"
    },
    {
        name: "AirPods(第1代)",
        img: "https://cdn.dribbble.com/userupload/15091242/file/original-48b2d1a706ab4acb37f3e87e7e6031ba.webp",
        description: "买来给小团子考研用的，最后她用腻了和我换了。"
    },
    {
        name: "华为Matebook14",
        img: "https://cdn.dribbble.com/userupload/15092583/file/original-4278d5b4ed5fac56cf6a1ba782f785e8.webp",
        description: "颜值可以，一直在用，装了三系统。"
    },
    {
        name: "iPhone Xr",
        img: "https://cdn.dribbble.com/userupload/15092580/file/original-811c4b120d6d43506206e23719f4b328.webp",
        description: "上大学父母给买的，现在退役，我爸在用。"
    },
    {
        name: "iPad 2018",
        img: "https://cdn.dribbble.com/userupload/15092577/file/original-5dde411a398c558ae3bd52fc1514163a.webp",
        description: "买的二手，陪伴我度过大学几年，坚挺到现在。"
    },
    {
        name: "红米 Bud4",
        img: "https://cdn.dribbble.com/userupload/15092582/file/original-85b5d3ee2664366448d194d12d0a69b9.webp",
        description: "性价比不错，有降噪，也小巧，就是耳朵带久了会疼。"
    },
    {
        name: "小爱触屏音响",
        img: "https://cdn.dribbble.com/userupload/15092584/file/original-695f5d137e19745976d183e5c9573fa5.webp",
        description: "平时听听歌挺好的，也是个不错的天气助手和闹钟。"
    },
    {
        name: "联想X4 骨传导耳机",
        img: "https://cdn.dribbble.com/userupload/15092581/file/original-08c0ff69632be027e8dca594c6cf599e.webp",
        description: "之前耳朵发炎，买了它，确实有用，运动出门带着方便"
    },
    {
        name: "口袋阅(1代)",
        img: "https://cdn.dribbble.com/userupload/15092579/file/original-833e1951ba5d956926ba79c0e65f2c41.webp",
        description: "护眼便携，还能打电话，续航持久，看书神器。"
    },
    {
        name: "Google Pixel3",
        img: "https://cdn.dribbble.com/userupload/15092578/file/original-a8939a3833e08ae4c33636d17dcd2328.webp",
        description: "体验谷歌亲儿子，最强单摄，咸鱼买的。"
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
            <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8 dark:text-white">我的装备📱</h1>
            <div className="grid grid-cols-2 gap-4 my-6 md:grid-cols-4 lg:grid-cols-5">
                {devices.map((device: DeviceType) => <DeviceCard key={device.name} {...device} />)}
            </div>
        </ListLayout>
    )
}

export default Devices
