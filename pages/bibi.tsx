import { GetStaticProps, NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import { BlogLayoutPure } from "../components/layout/BlogLayout";
import ListLayout from "../components/layout/ListLayout";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

interface Memos {
  id: string;
  content: string;
  createdTs: number;
  creatorName: string;
  creatorUsername: string;
  resourceList: any[];
}

const fetchMemos = async () => {
  const response = await fetch('https://tgapi.xiaoayu.eu.org/?tag=SFCN&limit=10%20type:memos');
  const data: Memos[] = await response.json();
  return data;
};

const Bibi: NextPage = () => {
  const [memos, setMemos] = useState<Memos[]>([]);

  useEffect(() => {
    const getMemos = async () => {
      const memosData = await fetchMemos();
      setMemos(memosData);
    };
    getMemos();
  }, []);

  return (
    <ListLayout>
      <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">说说✨</h1>
      <div className="timeline">
        {memos.map((memo) => (
          <div key={memo.id} className="timeline-item">
            <div className="timeline-item-content">
              <span className="tag">{memo.creatorName}</span>
              <time>{dayjs.unix(memo.createdTs).fromNow()}</time>
              <p dangerouslySetInnerHTML={{ __html: memo.content }}></p>
              <span className="circle" />
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .timeline {
          position: relative;
          padding: 1rem 0;
          list-style: none;
        }

        .timeline:before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          margin-left: -1px;
          background: var(--timeline-line-color, #ccc);
        }

        .timeline-item {
          position: relative;
          margin: 1rem 0;
        }

        .timeline-item-content {
          position: relative;
          margin-left: calc(50% + 2rem);
          padding: 1rem;
          background: var(--timeline-item-bg, #f9f9f9);
          border-radius: 8px;
          transition: background 0.3s ease;
        }

        .timeline-item-content:hover {
          background: var(--timeline-item-hover-bg, #e9e9e9);
        }

        .timeline-item-content time {
          font-size: 0.85rem;
          color: var(--timeline-time-color, #888);
        }

        .timeline-item-content .tag {
          display: inline-block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          background: var(--timeline-tag-bg, #0070f3);
          color: #fff;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .timeline-item-content .circle {
          position: absolute;
          top: 1rem;
          left: -2rem;
          width: 1rem;
          height: 1rem;
          background: var(--timeline-circle-bg, #0070f3);
          border-radius: 50%;
        }

        @media (prefers-color-scheme: dark) {
          .timeline:before {
            background: #444;
          }

          .timeline-item-content {
            background: #333;
            color: #ddd;
          }

          .timeline-item-content:hover {
            background: #444;
          }

          .timeline-item-content time {
            color: #aaa;
          }

          .timeline-item-content .tag {
            background: #0070f3;
          }

          .timeline-item-content .circle {
            background: #0070f3;
          }
        }

        @media (max-width: 768px) {
          .timeline:before {
            left: 2rem;
          }

          .timeline-item-content {
            margin-left: 4rem;
          }

          .timeline-item-content .circle {
            left: -1rem;
          }
        }
      `}</style>
    </ListLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60,
  };
};

(Bibi as NextPage).getLayout = function getLayout(page: ReactElement) {
  return (
    <BlogLayoutPure>
      {page}
    </BlogLayoutPure>
  );
};

export default Bibi;
