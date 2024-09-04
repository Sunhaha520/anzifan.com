import { FC, useEffect } from 'react';
import { Colors } from '../../lib/colors';
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
import gradient from 'chartjs-plugin-gradient';
import { Post } from '../../lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  gradient
);

export const WidgetOverViewSmall: FC<{ posts: Post[] }> = ({ posts }) => {
  const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }));
  const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }));
  const count = 0;
  const tagsAmount = tagsMap.reduce(
    (prev, cur) => prev + cur.tags.length,
    count
  );
  const categoryCount = 5;

  useEffect(() => {
    const loadPoem = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/js-heo@1.0.11/poem/jinrishici.js';
      script.charset = 'utf-8';
      script.onload = () => {
        (window as any).jinrishici.load((result: any) => {
          const sentence = document.querySelector("#poem_sentence") as HTMLElement;
          const author = document.querySelector("#poem_author") as HTMLElement;
          const dynasty = document.querySelector("#poem_dynasty") as HTMLElement;

          const sentenceText = result.data.content.slice(0, -1); // Remove last character
          if (sentence) sentence.innerHTML = sentenceText;
          if (dynasty) dynasty.innerHTML = result.data.origin.dynasty;
          if (author) author.innerHTML = `${result.data.origin.author}《${result.data.origin.title}》`;
        });
      };
      document.body.appendChild(script);
    };

    loadPoem();
  }, []);

  return (
    <div data-aos="fade-up" className="widget-overview-container">
      <div className="widget-overview">
        <div className="aspect-square overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100" dark="border-true-gray-900 border-none">
          <div className="flex flex-row justify-between h-full bg-white shadow-sm p-3.5" dark="bg-true-gray-900">
            <div className="flex flex-col justify-between">
              <div className="w-12 xs:text-[40px] animate-wave inline origin-bottom-right text-3xl">
                👋
              </div>
              <div className="xs:text-xl leading-4 xs:leading-6 font-semibold text-sm">
                <p className={`${Colors["orange"]?.text.normal} line-clamp-1`}>{dateMap.length} 篇文章</p>
                <p className={`${Colors["pink"]?.text.normal} line-clamp-1`}>{tagsAmount} 个话题</p>
                <p className={`${Colors["blue"]?.text.normal} line-clamp-1`}>{categoryCount} 个归档</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="card-poem" className="card-poem">
        <div id="poem_sentence"></div>
        <div id="poem_info">
          <div id="poem_dynasty"></div>
          <div id="poem_author"></div>
        </div>
      </div>
    </div>
  );
};

// CSS 样式
const styles = `
.widget-overview-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem; /* Adjust the gap between components as needed */
}

.widget-overview {
  flex: 1; /* Allows the overview widget to take available space */
}

.card-poem {
  display: flex;
  flex-direction: column;
  padding: 0.5rem !important;
  min-height: 130px;
  border: 1px solid #ccc;
}

#poem_sentence {
  text-align: center;
  font-family: serif, cursive;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  background: var(--heo-secondbg);
  min-height: 62px;
}

#poem_info {
  display: flex;
  color: var(--heo-secondtext);
  font-size: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

#poem_author {
  order: 1;
  padding: 2px;
  margin-left: 8px;
}

#poem_dynasty {
  order: 0;
  padding: 2px 4px 2px 6px;
  background: var(--heo-card-btn-bg);
  color: var(--heo-fontcolor);
  border-radius: 8px;
}
`;

// Create a style element and add it to the document head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default WidgetOverViewSmall;
