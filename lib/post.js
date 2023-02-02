import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts"); ///home/nami/nextjs/nextjs-microblog/posts



//mdファイルのデータを取り出す
export function getPostsData(){
  
  const fileNames = fs.readdirSync(postsDirectory); //postsの中にあるファイル名を配列としてもたせた
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/,"") //ファイル名（id）, birthday とか

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);        
    const fileContents = fs.readFileSync(fullPath, "utf-8") //ファイルの中身を文字列で格納
    
    const matterResult = matter(fileContents); //メタデータの文字列をマークダウンで解析、きれいに表示するんだなきっと
    
    //idとデータを返す.
    return {
      id,
      ...matterResult.data, //3つのメタデータをきれいにとるために3つのドット
    }
    
    
  })
  return allPostsData;  
  

}

//getStaticpathsでreturnでかえすPathsを取得する
export function getAllPostsIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
   return {
    params: {
      id: fileName.replace(/\.md$/,"") //ファイル名（id）, birthday とか
    }
   } 
  }    
  ); 
}



/*
  [
    {
      params: {
        id: birthday
      }
    }
    {
      params: {
        id: goldenweek
      }
    }
  ]
  */


  //idに基づいてブログ投稿データを渡す
  export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);
    console.log("matterResult", matterResult);    

    const blogContent = await remark()
      .use(html)
      .process(matterResult.content);
        
    const blogContentHTML = blogContent.toString();
    
    console.log("blogContent", blogContent);

    return {
      id,
      blogContentHTML,
      ...matterResult.data,
    };
  }

