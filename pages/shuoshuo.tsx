import { NextPage } from "next";
import ListLayout from "../components/layout/ListLayout";
import { FC } from "react";
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface ShuoshuoType {
  avatar: string;
  nickname: string;
  time: string;
  content: string;
}

const ShuoshuoCard: FC<ShuoshuoType> = ({ avatar, nickname, time, content }) => {
  return (
    <div className="flex items-center p-4 transition duration-200 ease-in-out transform bg-white shadow-lg rounded-3xl hover:scale-105 dark:bg-true-gray-900">
      <div className="w-20 h-20 rounded-full overflow-hidden relative">
        <Image layout="fill" objectFit="cover" src={avatar} alt={nickname} />
      </div>
      <div className="flex flex-col ml-4">
        <div className="flex items-center justify-between">
          <span className="font-bold">{nickname}</span>
          <span className="text-sm text-true-gray-400">{time}</span>
        </div>
        <div className="mt-2 text-true-gray-600 dark:text-true-gray-400">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const Shuoshuo: NextPage<{ shuoshuo: ShuoshuoType[] }> = ({ shuoshuo }) => {
  return (
    <ListLayout>
      <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">说说📢</h1>
      <div className="grid grid-cols-1 gap-4 my-6 md:grid-cols-2 lg:grid-cols-3">
        {shuoshuo.map((item, index) => (
          <ShuoshuoCard key={index} {...item} />
        ))}
      </div>
    </ListLayout>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'shuoshuo.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const shuoshuo: ShuoshuoType[] = JSON.parse(jsonData);

  return {
    props: {
      shuoshuo
    }
  };
}

export default Shuoshuo;
