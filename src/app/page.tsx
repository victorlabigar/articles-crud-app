import Image from "next/image";
import prisma from '@/lib/prisma';
import styles from "./page.module.css";
import Link from "next/link";
import Nav from "@/components/Nav";

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function getArticles() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc'}
  });

  return articles;
}

export default async function Home() {
  const articles = await getArticles();

  // 1. Get the session
  // const session = await getServerSession(authOptions);

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles.intro}>
          <h1>Articles</h1>
          <p>
            Here's a list of all articles
          </p>
        </div>

        <section className={styles.articles}>
          {articles.length > 0 ? (
            articles.map((article: any) => (
              <article className={styles.article} key={article.id}>
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
