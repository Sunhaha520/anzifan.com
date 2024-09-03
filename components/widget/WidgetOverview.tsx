import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Post } from "../../lib/types";
import { Colors } from "../../lib/colors";

const AnalogClock: FC = () => {
  useEffect(() => {
    const setClock = () => {
      const deg = 6;
      const hour = document.querySelector(".hour") as HTMLElement;
      const min = document.querySelector(".min") as HTMLElement;
      const sec = document.querySelector(".sec") as HTMLElement;

      if (hour && min && sec) {
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;

        hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
        min.style.transform = `rotateZ(${mm}deg)`;
        sec.style.transform = `rotateZ(${ss}deg)`;
      }
    };

    setClock();
    const interval = setInterval(setClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <div className="hour"></div>
      <div className="min"></div>
      <div className="sec"></div>
    </div>
  );
};

export const WidgetOverViewMedium: FC<{ posts: Post[], fix?: boolean }> = ({ posts, fix }) => {
  const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
  const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
  const count = 0;
  const tagsAmount = tagsMap.reduce(
    (prev, cur) => prev + cur.tags.length,
    count
  );

  // 直接显示固定的“5个归档”
  const categoryCount = 5;

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
              <p className={`${Colors["blue"]?.text.normal}`}>{categoryCount} 个归档</p>
            </div>
          </div>
          <div className="text-xs w-6/11 lg:(w-1/2 text-md) lg<:text-sm font-medium h-full flex flex-col justify-between">
            <AnalogClock />
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          :root {
            --main-bg-color: #fff;
            --main-text-color: #888888;
          }

          [data-theme="dark"] {
            --main-bg-color: #1e1f26;
            --main-text-color: #ccc;
          }

          .clock {
            min-height: 18em;
            min-width: 18em;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--main-bg-color);
            background-image: url("https://imvpn22.github.io/analog-clock/clock.png");
            background-position: center center;
            background-size: cover;
            border-radius: 50%;
            border: 4px solid var(--main-bg-color);
            box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
              inset 0 -15px 15px rgba(255, 255, 255, 0.05), 0 15px 15px rgba(0, 0, 0, 0.3),
              inset 0 15px 15px rgba(0, 0, 0, 0.3);
            transition: all ease 0.2s;
          }

          .clock:before {
            content: "";
            height: 0.75rem;
            width: 0.75rem;
            background-color: var(--main-text-color);
            border: 2px solid var(--main-bg-color);
            position: absolute;
            border-radius: 50%;
            z-index: 1000;
            transition: all ease 0.2s;
          }

          .hour,
          .min,
          .sec {
            position: absolute;
            display: flex;
            justify-content: center;
            border-radius: 50%;
          }

          .hour {
            height: 10em;
            width: 10em;
          }

          .hour:before {
            content: "";
            position: absolute;
            height: 50%;
            width: 6px;
            background-color: var(--main-text-color);
            border-radius: 6px;
          }

          .min {
            height: 12em;
            width: 12em;
          }

          .min:before {
            content: "";
            height: 50%;
            width: 4px;
            background-color: var(--main-text-color);
            border-radius: 4px;
          }

          .sec {
            height: 13em;
            width: 13em;
          }

          .sec:before {
            content: "";
            height: 60%;
            width: 2px;
            background-color: #f00;
            border-radius: 2px;
          }
        `}
      </style>
    </div>
  );
};
