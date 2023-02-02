import Head from "next/head";
import styles from "./Layout.module.css";
import UtilStyles from "../styles/utils.module.css";
import Link from "next/link";
const name = "Blue Code";
const siteTitle = "Next.js blog";
export {siteTitle};
import Image from "next/image";

function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                {home ?
                  (
                    <>
                      <img className={UtilStyles.profileImage} src="/images/profile.jpg" />
                      <h1 className={UtilStyles.heading2Xl}>{name}</h1>   
                    </>
                  ) :
                  (
                    <>
                      <img className={`${UtilStyles.borderCircle} ${styles.headerHomeImage}`} src="/images/profile.jpg" />
                      <h1 className={UtilStyles.heading2Xl}>{name}</h1>
                    </>
                  ) }
                
                
            </header>
            <main>{children}</main>      
            {!home && (
              <div>
                <Link legacyBehavior href="/">
                  <a>ホームへ戻る</a>
                </Link>
              </div>
            )}

        </div>
    );
}

export default Layout;
