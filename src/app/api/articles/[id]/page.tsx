import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma'; // Our "master key"
import styles from '../../page.module.css'; // Re-use styles from home
import Image from 'next/image';


interface ArticlePageProps {
  params: {
    id: string;
  };
}

async function getArticle(id: string) {
  try {
    // We use findUnique to get just one, based on its ID
    const article = await prisma.article.findUnique({
      where: {
        // We must convert the 'id' from the URL (which is a string)
        // into a number, because our database schema expects an Int.
        id: parseInt(id, 10), 
      },
    });

    return article;
  } catch (error) {
    // Handle cases where the ID is not a valid number, etc.
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { id } = params;
    const article = await getArticle(id);

    // 3. Handle "Not Found"
    // If no article is found with that ID, show the 404 page
    if (!article) {
        notFound();
    }

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
                    <Link href={'/'} className={`${styles.btn} ${styles.btnPrimary}`} >View All Article</Link>
                </header>

              
                <section className={styles.articles}>
                    <article key={article.id}>
                        <h1>{article.title}</h1>
                        <p>
                            <small>{new Date(article.createdAt).toLocaleString()}</small>
                        </p>

                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {article.body}
                        </div>
                    </article>
                </section>
            
            </main>
        </div>
    )
}