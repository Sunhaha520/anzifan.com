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
}

const fetchMemos = async () => {
  const response = await fetch('https://tgapi.xiaoayu.eu.org/?tag=SFCN&limit=10&type=memos');
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
      <div className="memos-list">
        {memos.map((memo) => (
          <div key={memo.id} className="memo-card">
            <div className="memo-header">
              <img src="/path-to-avatar.jpg" alt="可乐君" className="avatar" />
              <div className="memo-info">
                <span className="nickname">可乐君</span>
                <time className="timestamp">{dayjs.unix(memo.createdTs).fromNow()}</time>
              </div>
            </div>
            <div className="memo-content">
              <p dangerouslySetInnerHTML={{ __html: memo.content }}></p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .memos-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .memo-card {
          background: var(--card-bg, #f9f9f9);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          transition: background 0.3s ease;
        }

        .memo-card:hover {
          background: var(--card-hover-bg, #e9e9e9);
        }

        .memo-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 0.5rem;
        }

        .memo-info {
          display: flex;
          flex-direction: column;
        }

        .nickname {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .timestamp {
          font-size: 0.85rem;
          color: var(--timestamp-color, #888);
        }

        .memo-content {
          margin-top: 0.5rem;
        }

        @media (prefers-color-scheme: dark) {
          .memo-card {
            background: #333;
            color: #ddd;
          }

          .memo-card:hover {
            background: #444;
          }

          .timestamp {
            color: #aaa;
          }
        }
      `}</style>
    </ListLayout>
  );
};

// 定义扩展的 NextPage 类型
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60,
  };
};

// 使用扩展类型
(Bibi as NextPageWithLayout).getLayout = function getLayout(page: ReactElement) {
  return (
    <BlogLayoutPure>
      {page}
    </BlogLayoutPure>
  );
};

export default Bibi;
