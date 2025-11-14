import Image from "next/image";
import prisma from '@/lib/prisma';
import styles from "./page.module.css";
import Link from "next/link";

async function getArticles() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc'}
  });

  return articles;
}

export default async function Home() {

  const articles = await getArticles();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <Image
            className={styles.logo}
            src="/uncinc.svg"
            alt="Unc Inc logo"
            width={100}
            height={20}
            priority
          />
          <Link href={'new'} className={`${styles.btn} ${styles.btnPrimary}`} >New Article</Link>
        </header>

        <div className={styles.intro}>
          <h1>My First CRUD App</h1>
          <p>
            Here's a list of all our articles
          </p>
        </div>

        <section className={styles.articles}>
          {articles.length > 0 ? (
            articles.map((article: any) => (
              <article key={article.id}>
                <h2>{article.title}</h2>
                <p>{article.body.substring(0, 150)}...</p>
                <small>
                  {new Date(article.createdAt).toLocaleString()}
                </small>

                <Link className={`${styles.btn} ${styles.btnSecondary}`} href={`/articles/${article.id}`}>
                  Read article
                </Link>
              </article>
            ))
          ): (
            <p>No articles found</p>
          )}
        </section>
       
      </main>
    </div>
  );
}
