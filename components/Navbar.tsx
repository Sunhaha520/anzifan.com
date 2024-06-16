import Link from 'next/link';
import { FC, Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { classNames } from '../lib/util'; // 需要添加classNames函数
import PostToc from './PostToc';
import TagsIcon from '../assets/tags.svg';
import CategoriesIcon from '../assets/categories.svg';
import FriendsIcon from '../assets/friends.svg';
import MeIcon from '../assets/me.svg';
import TocIcon from '../assets/toc.svg';
import MenuIcon from '../assets/menu.svg';
import TocFillIcon from '../assets/toc_fill.svg';
import DeviceIcon from '../assets/device.svg';
import TalkIcon from '../assets/talk.svg';
import { Colors } from '../lib/colors';

const navigations = [
  {
    name: '标签',
    link: '/tags',
    icon: <TagsIcon />,
    color: Colors['pink'].text.normal,
  },
  {
    name: '分类',
    link: '/categories',
    icon: <CategoriesIcon />,
    color: Colors['orange'].text.normal,
  },
  {
    name: '朋友们',
    link: '/friends',
    icon: <FriendsIcon />,
    color: Colors['blue'].text.normal,
  },
  {
    name: '装备',
    link: '/devices',
    icon: <DeviceIcon />,
    color: Colors['green'].text.normal,
  },
  {
    name: '说说',
    link: '/bibi',
    icon: <TalkIcon />,
    color: Colors['yellow'].text.normal,
  },
  {
    name: '关于我',
    link: '/me',
    icon: <MeIcon />,
    color: Colors['red'].text.normal,
  },
];

const MenuItemLink = (props: { [x: string]: any; href: any; children: any }) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

const Navbar: FC<{ toc: any }> = ({ toc }) => {
  const path = useRouter().asPath;
  const isPost = path.startsWith('/post/');
  const [isFolded, setIsFolded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMenuClick = () => {
    if (!isAnimating) {
      setIsFolded(!isFolded);
    }
  };

  const handleMouseEnter = () => {
    setIsAnimating(true);
    setIsFolded(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isFolded) {
        setIsFolded(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFolded]);

  return (
    <header className="sticky top-0 z-50 font-bold bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg backdrop-saturate-200 border-b-[0.5px] border-b-true-gray-100 dark:bg-true-gray-900/70 dark:border-b-true-gray-800" data-aos="fade-down" id="navbar">
      <div className="flex items-center justify-between px-6 py-3 mx-auto lg:px-11 lg:w-screen-lg whitespace-nowrap">
        <div className="z-50">
          <Link href="/">可乐君の小站</Link>
        </div>
        <div className="flex items-center">
          {isPost ? (
            <Menu>
              <Menu.Button className="flex items-center px-0 m-0 mr-6 z-50">
                {({ open }) => (!open ? <TocIcon /> : <TocFillIcon />)}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
              >
                <Menu.Items className="absolute top-0 left-0 w-full h-screen bg-true-gray-900/50 backdrop-filter backdrop-blur-sm dark:bg-true-gray-900/70">
                  <Menu.Item>
                    <div className="flex place-items-center w-full h-full">
                      <div className="mx-5 w-full sm:mx-auto md:w-150 overflow-scroll bg-white rounded-3xl scrollbar-hide dark:bg-black">
                        <PostToc blocks={toc} />
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : null}
          <nav className="hidden sm:flex items-center justify-center space-x-5">
            {navigations.map((n, i) => (
              <Link href={n.link} key={i}>
                <a className="flex items-center justify-center space-x-1 group">
                  {n.icon}
                  <div className={`w-0 overflow-hidden transition-all duration-600 ease-in-out ${n.color} group-hover:w-auto`}>{n.name}</div>
                </a>
              </Link>
            ))}
          </nav>
          <div className="block sm:hidden">
            <button
              onMouseEnter={handleMouseEnter}
              onClick={handleMenuClick}
              className="flex items-center px-0 m-0 text-current bg-transparent cursor-pointer rounded-3xl focus:outline-none"
            >
              <MenuIcon className={`transition-transform duration-300 ease-in-out transform ${isFolded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>
      <Transition
        show={isFolded}
        as="div"
        enter="ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 z-40 bg-neutral-200 bg-opacity-20 backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out dark:bg-neutral-900 dark:bg-opacity-20"
        onClick={() => setIsFolded(false)}
      >
        <div className="absolute top-0 left-0 z-50 w-full h-screen p-4 bg-white dark:bg-black">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
            {navigations.map((n, i) => (
              <Link href={n.link} key={i}>
                <a className="flex items-center h-10 p-2 rounded-2xl shadow-md bg-opacity-80 dark:bg-opacity-80 dark:shadow-neutral-700 hover:scale-105 hover:bg-opacity-100 dark:hover:bg-opacity-100">
                  <div className="w-10">{n.icon}</div>
                  <p className={`whitespace-nowrap ${n.color}`}>{n.name}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default Navbar;
