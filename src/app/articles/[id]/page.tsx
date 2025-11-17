import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma'; // Our "master key"
import styles from '../../page.module.css'; // Re-use styles from home
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

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
      include: {
        author: true, // Tell Prisma to also fetch the related Author
      },
    });

    return article;
  } catch (error) {
    // Handle cases where the ID is not a valid number, etc.
    return null;
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    // 1. We must "await" the params object itself to unwrap it
    const unwrappedParams = await params;

    // 2. NOW we can safely access .id from the unwrapped object
    const article = await getArticle(unwrappedParams.id);

    const session = await getServerSession(authOptions);

    // 3. Handle "Not Found"
    // If no article is found with that ID, show the 404 page
    if (!article) {
        notFound();
    }

    const currentUserId = (session?.user as any)?.id;
    const isAuthor = parseInt(currentUserId) === article.authorId;

    console.log('isAuthor', isAuthor)
    console.log('currentUserId', currentUserId)
    console.log('article.authorId', article.authorId)

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <section className={styles.articles}>
                    <article className={styles.articleContent}>
                      {isAuthor && (
                        <Link
                          href={`/articles/${article.id}/edit`}
                          style={{ color: 'white' }} // Pushes button to the right
                        >
                          Edit Article
                        </Link>
                      )}
                      
                      <h1>{article.title}</h1>
                      <p>
                        <small>
                          By {article.author.name} | Published on:{' '}
                          {new Date(article.createdAt).toLocaleString()}
                        </small>
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