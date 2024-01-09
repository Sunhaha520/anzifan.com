import { links } from '../config/links'
import { Gmail, Java, Python , Javascript, Typescript, Swift, Mysql, Realm, Mongodb, Html5, CssThree, ReactJs, Nodedotjs, Nextdotjs, Vuedotjs, Tailwindcss, Spring, Springboot, Stylus , Scikitlearn, Tensorflow, Docker, Git, Redis, Apachehadoop, Postman} from '@icons-pack/react-simple-icons'

export const me = {
    site: "https://cola.xiaoayu.ren",
    name: '可乐君de小站💯',
    bio: '💻 🎨 🎮 ⚡️',
    social: [
        ...links,
        {
            url: 'mailto:dereksun@163.com',
            icon: Gmail,
            name: 'Email',
            fill: "fill-gray-400",
            border: "border-gray-400",
            text: "text-gray-400",
            shadow: "shadow-sky-300",
            color: 'from-blue-600 to-sky-300',
        },
    ],
    overview : [
        
    ],
    education: [
        {
            name: 'Nanjing Forestry University',
            time: '2019-2023',
            degree: 'BS, Civil Engineering',
            color: 'blue',
            logo : "/static/images/nyit.png",
        },
        {
            name: 'University of Macau(Maybe)',
            time: '2023-2025*',
            degree: 'MS, Project Management',
            color: 'yellow',
            logo : "/static/images/njupt.png",
        },
        {
            name: 'University of Macau(Maybe)',
            time: '2025-2028',
            degree: 'PHD, Artificial Intelligence',
            color: 'red',
            logo : "/static/images/neu.png",
        }
    ],
    publications: [
        {
            title: 'OpenCV-based parking lot vacancy detection software works',
            authors: [
                {
                    name: "Derek Sun",
                    me: true
                }
            ],
            website: "https://github.com/Sunhaha520/Machine-Vision-Project",
            link: "https://www.ccopyright.com.cn/",
            tags: [
                {
                    name: "OpenCV",
                    color: "blue"
                },
                {
                    name: "Python",
                    color: "yellow"
                },
                {
                    name: "Object Detection",
                    color: "red"
                },
                // {
                //     name: "Computational Paralinguistic Challenge",
                //     color: "green"
                // }
            ]
        }
    ],
    projects: [
        {
            name: "NJFU-WiFi-Tools",
            description: "Nanjing Forestry University campus network cracking software.",
            tip: "Support linux, windows, ios and Android",
            images: ["/static/images/Astraios/4.png", "/static/images/Astraios/3.png", "/static/images/Astraios/2.png", "/static/images/Astraios/5.png", "/static/images/Astraios/7.png"],
            icon: "/static/images/Astraios/astraios.png",
        },
        {
            name: "Machine-Vision-Project",
            description: "Some interesting opencv projects.",
            tag: ["OpenCV","Python","Object Detection"],
            video: "/static/videos/pokemon.mp4",
            icon: "/static/images/pokemon.png"
        }
    ],
    skills : [[
        { name: "Java", color: "bg-[#007396]", icon: Java},
        { name: "Python", color: "bg-[#3776AB]", icon: Python},
        { name: "Javascript", color: "bg-[#F7DF1E]", icon: Javascript},
        { name: "Typescript", color: "bg-[#3178C6]", icon: Typescript},
        { name: "Swift", color: "bg-[#F05138]", icon: Swift},        
        { name: "HTML5", color: "bg-[#E34F26]", icon: Html5},
        { name: "CSS3", color: "bg-[#1572B6]", icon: CssThree},        
    ],
    [
        { name: "Apache Hadoop", color: "bg-[#66CCFF]", icon: Apachehadoop},
        { name: "React", color: "bg-[#61DAFB]", icon: ReactJs},
        { name: "Node.js", color: "bg-[#339933]", icon: Nodedotjs},
        { name: "Next.js", color: "bg-[#000000]", icon: Nextdotjs},
        { name: "Vue.js", color: "bg-[#4FC08D]", icon: Vuedotjs},
        { name: "Tailwind CSS", color: "bg-[#06B6D4]", icon: Tailwindcss},
        { name: "Spring", color: "bg-[#6DB33F]", icon: Spring},
        { name: "Stylus", color: "bg-[#333333]", icon: Stylus},
        { name: "scikit-learn", color: "bg-[#F7931E]", icon: Scikitlearn},    
        { name: "TensorFlow", color: "bg-[#F7931E]", icon: Tensorflow},    
    ],
    [          
        { name: "MySQL", color: "bg-[#4479A1]", icon: Mysql},
        { name: "Redis", color: "bg-[#DC382D]", icon: Redis},
        { name: "Realm", color: "bg-[#39477F]", icon: Realm},
        { name: "MongoDB", color: "bg-[#47A248]", icon: Mongodb},
        { name: "Git", color: "bg-[#F05032]", icon: Git},
        { name: "Postman", color: "bg-[#FF6C37]", icon: Postman},
        { name: "Docker", color: "bg-[#0AA6D8]", icon: Docker}    
    ]
]
}
