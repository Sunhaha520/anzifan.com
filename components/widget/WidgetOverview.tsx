import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Howl } from "howler";

export const CDPlayer: FC<{ albumArt: string, musicSrc: string }> = ({ albumArt, musicSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [howl, setHowl] = useState<Howl | null>(null);

    useEffect(() => {
        const sound = new Howl({ src: [musicSrc] });
        setHowl(sound);

        return () => {
            sound.unload();
        };
    }, [musicSrc]);

    const togglePlay = () => {
        if (howl) {
            if (isPlaying) {
                howl.stop();
            } else {
                howl.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="cd-player-container" onClick={togglePlay}>
            <div className={`cd ${isPlaying ? 'cd-rotate' : ''}`}>
                <Image src={albumArt} alt="Album Art" layout="fill" objectFit="cover" className="album-art" />
            </div>
            <style jsx>{`
                .cd-player-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;
                    position: relative;
                }
                .cd {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    overflow: hidden;
                    position: absolute;
                    top: 0;
                    left: 0;
                    transition: transform 0.5s;
                }
                .cd-rotate {
                    animation: spin 2s linear infinite;
                }
                .album-art {
                    width: 100%;
                    height: 100%;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

// Example usage in a component
const WidgetOverViewSmall: FC<{ posts: Post[] }> = ({ posts }) => {
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
                            <OverviewPvAll />
                        </div>
                    </div>
                    <CDPlayer albumArt="/path/to/album/art.jpg" musicSrc="/path/to/music/file.mp3" />
                </div>
            </div>
        </div>
    );
};

// Dummy OverviewPvAll component for demonstration purposes
const OverviewPvAll = () => {
    return <p className={`${Colors["blue"]?.text.normal} line-clamp-1`}>25,223 次访问</p>;
};
