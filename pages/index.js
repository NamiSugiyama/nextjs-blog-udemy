import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../component/Layout'
import UtilStyle from '../styles/utils.module.css';
import { getPostsData } from '../lib/post';



const inter = Inter({ subsets: ['latin'] })

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData();
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  }
}


// //SSRの場合
// export async function getServerSideProps(){
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     }
//   }
// }


export default function Home({allPostsData}) {
  console.log(allPostsData);
  return (   
    <Layout home>
      <Head>
        <title>Next.js blog</title>
      </Head>
      <section className={UtilStyle.headingMd}>
        <p>コーディングやシステム開発の勉強をしています。</p>
      </section>
      <section className={`${UtilStyle.headingMd} ${UtilStyle.padding1px}`}>
        <h2>📝成長記録/ブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
              <img className={`${UtilStyle.imageSize} ${styles.thumbnailImage}`} src={`${thumbnail}`}  />
              </Link>
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={UtilStyle.boldText}>{title}</a> 
              </Link>
              <br/>
              <small className={UtilStyle.lightText}>{date}</small>
            </article>
          ))}                      
        </div>
      </section>
    </Layout>

    
  );
}
