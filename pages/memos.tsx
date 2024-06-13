import { NextPage } from "next"
import { useEffect } from "react"
import ListLayout from "../components/layout/ListLayout"

const Memos: NextPage = () => {
  useEffect(() => {
    // 引入外部的JS和CSS
    const artalkCSS = document.createElement("link");
    artalkCSS.rel = "stylesheet";
    artalkCSS.href = "https://cdn.bootcdn.net/ajax/libs/artalk/2.5.5/Artalk.css";
    document.head.appendChild(artalkCSS);

    const artalkJS = document.createElement("script");
    artalkJS.src = "https://cdn.bootcdn.net/ajax/libs/artalk/2.5.5/Artalk.js";
    document.body.appendChild(artalkJS);

    const markedJS = document.createElement("script");
    markedJS.src = "https://npm.elemecdn.com/marked/marked.min.js";
    document.body.appendChild(markedJS);

    const viewImageJS = document.createElement("script");
    viewImageJS.src = "https://jsd.onmicrosoft.cn/gh/Tokinx/ViewImage/view-image.min.js";
    document.body.appendChild(viewImageJS);

    const latelyJS = document.createElement("script");
    latelyJS.src = "https://jsd.onmicrosoft.cn/gh/Tokinx/Lately/lately.min.js";
    document.body.appendChild(latelyJS);

    // 初始化配置
    const script = document.createElement("script");
    script.innerHTML = `
      var bbMemo = {
        memos : 'https://say.veryjack.com/',
        limit : '10',
        creatorId:'1',
        domId: '#bber',
        username:"阿杰",
        useravatar:"https://pix.veryjack.com/i/2023/04/04/fsxnkv.webp",
        userlink:"https://veryjack.com",
        tags:"",
        commentsShow:true,
        commentsUrl:"https://say.veryjack.com/m/",
        commentsTitle:"评论"
      }
      var artalkInit = {
        site: "Jack's Space",
        server:'https://artalk.veryjack.com'
      }
    `;
    document.body.appendChild(script);

    const shuoshuoJS = document.createElement("script");
    shuoshuoJS.src = "public/shuoshuo.js";
    document.body.appendChild(shuoshuoJS);
  }, []);

  return (
    <ListLayout>
      <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-8">说说📢</h1>
      <div id="bber"></div>
    </ListLayout>
  )
}

export default Memos
