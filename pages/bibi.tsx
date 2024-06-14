import { NextPage } from "next";
import ListLayout from "../components/layout/ListLayout";
import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from 'swr';
import Image from 'next/image';
import { Colors } from "../lib/colors";

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

interface Memos {
  id: string;
  content: string;
  createdTs: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const MemoCard: FC<Memos> = (memo) => {
  return (
    <div className="flex items-start p-4 transition duration-200 ease-in-out transform bg-white shadow-lg rounded-3xl hover:scale-105" dark="bg-true-gray-900">
      <Image src="https://cdn.dribbble.com/userupload/15096090/file/original-a79a16aa0e2a9f34c4521da09f7cc4d0.webp" alt="可乐君" width={40} height={40} className="rounded-full" />
      <div className="ml-4">
        <div className="flex items-center justify-between">
          <span className="font-bold">可乐君</span>
          <time className="text-sm text-true-gray-400" dark="text-true-gray-500">{dayjs.unix(memo.createdTs).fromNow()}</time>
        </div>
        <div className="mt-2 text-true-gray-800" dark="text-true-gray-300" dangerouslySetInnerHTML={{ __html: memo.content }}></div>
      </div>
    </div>
  );
};

const Bibi: NextPage = () => {
  const { data, error } = useSWR('https://tgapi.xiaoayu.eu.org/?tag=SFCN&limit=10&type=memos', fetcher);

  if (error) return <div>加载失败</div>;
  if (!data) return <div>加载中...</div>;

  return (
    <ListLayout>
      <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">说说✨</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((memo: Memos) => <MemoCard key={memo.id} {...memo} />)}
      </div>
    </ListLayout>
  );
};

export default Bibi;
