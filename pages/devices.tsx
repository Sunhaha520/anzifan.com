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
        name: "魅族21NOTE",
        img: "https://cdn.dribbble.com/userupload/16336463/file/original-fdad7561b84872f7e5e8b8175b18f75e.webp",
        description: "新手机，第一次用魅族，体验了一把Flyme。"
    },
    {
        name: "小米 12X",
        img: "https://cdn.dribbble.com/userupload/15094426/file/original-432a42e3f5a630933b111435d9c67dad.webp",
        description: "好用，小巧次旗舰，小团子送我的！我要用好久！"
    },
    {
        name: "荣耀手环6",
        img: "https://cdn.dribbble.com/userupload/15094424/file/original-c03f30e13315da6dfae2e2f88fccd4b0.webp",
        description: "计步，血氧，睡眠，NFC 通通都有，表盘漂亮。"
    },
    {
        name: "松下GF3微单",
        img: "https://cdn.dribbble.com/userupload/15094425/file/original-e4b370e78273f6f7aed98b4123bd2be3.webp",
        description: "虽老，但是拍照依旧强劲，配了个小蚁镜头，拍人很不错。"
    },
    {
        name: "AirPods(第3代)",
        img: "https://cdn.dribbble.com/userupload/15094421/file/original-18b74d7d757dc743d25e419898dc6045.webp",
        description: "小团子买的，我用了一段时间，后来她抢走了。"
    },
    {
        name: "RK-61机械键盘",
        img: "https://cdn.dribbble.com/userupload/15094422/file/original-c180a9d6d0044a50044358847fa1d2fa.webp",
        description: "我对键盘没需求，感觉还不错，京东羊毛19元到手。"
    },
    {
        name: "AirPods(第1代)",
        img: "https://cdn.dribbble.com/userupload/15094418/file/original-da8319f445496eef2a21967d7c9c48a9.webp",
        description: "买来给小团子考研用的，最后她用腻了和我换了。"
    },
    {
        name: "华为Matebook14",
        img: "https://cdn.dribbble.com/userupload/15094415/file/original-e6544dc51e0dc75e3d437b77bfb5272e.webp",
        description: "颜值可以，一直在用，装了三系统。"
    },
    {
        name: "iPhone Xr",
        img: "https://cdn.dribbble.com/userupload/15094420/file/original-a85967e61e4023b0884c0c725757b7ad.webp",
        description: "上大学父母给买的，现在退役，我爸在用。"
    },
    {
        name: "iPad 2018",
        img: "https://cdn.dribbble.com/userupload/15094419/file/original-dc185cb739fa8d34d433f99754358073.webp",
        description: "买的二手，陪伴我度过大学几年，坚挺到现在。"
    },
    {
        name: "红米 Bud4",
        img: "https://cdn.dribbble.com/userupload/15094413/file/original-8619e8607023c0eaff04596c5bdd8576.webp",
        description: "性价比不错，有降噪，也小巧，就是耳朵带久了会疼。"
    },
    {
        name: "小爱触屏音响",
        img: "https://cdn.dribbble.com/userupload/15094423/file/original-a33c3e2e35d3078fc216eb5e4f5131b4.webp",
        description: "平时听听歌挺好的，也是个不错的天气助手和闹钟。"
    },
    {
        name: "联想X4 骨传导耳机",
        img: "https://cdn.dribbble.com/userupload/15094414/file/original-b86a81a9eb3ecdd9b4c0cdbf1d83b73b.webp",
        description: "之前耳朵发炎，买了它，确实有用，运动出门带着方便"
    },
    {
        name: "口袋阅(1代)",
        img: "https://cdn.dribbble.com/userupload/15094417/file/original-931f450398ea5ad9e91e745b9c1814ba.webp",
        description: "护眼便携，还能打电话，续航持久，看书神器。"
    },
    {
        name: "Google Pixel3",
        img: "https://cdn.dribbble.com/userupload/15094416/file/original-5068b9d4dbf553adb32ba3e9be2c690c.webp",
        description: "体验谷歌亲儿子，最强单摄，咸鱼买的。"
    },
    // 添加更多设备信息
]

const DeviceCard: FC<DeviceType> = ({ name, img, description }) => {
    return (
        <div className="transition duration-200 ease-in-out transform bg-white shadow-lg rounded-3xl hover:scale-105 dark:bg-true-gray-900">
            <div className="relative w-full h-40 bg-true-gray-0 rounded-t-3xl overflow-hidden dark:bg-true-gray-900">
                <Image layout='fill' objectFit="cover" src={img} alt={name} className="object-cover" />
            </div>
            <div className="flex flex-col items-center justify-between h-full p-5">
                <div className="text-center">
                    <p className="leading-4 dark:text-white">{name}</p>
                    <div className="mt-3 text-xs text-true-gray-400 dark:text-true-gray-300">
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
