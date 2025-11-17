import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from 'next-auth'; // Import this
import { authOptions } from '@/lib/auth'; // Import our options

interface RouteContext {
    params: Promise<{
        id: string
    }>
}

export async function PUT(request: Request, props: RouteContext) {
    const params = await props.params;
    try {
        // get loggedin user session
        const session = await getServerSession(authOptions);

        if(!session || !session.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // get the new title and content from the request
        const data = await request.json();
        const { title, body } = data;
        const articleId = parseInt(params.id, 10);

        if (!title || !body) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        if (body.length < 10) {
            return NextResponse.json(
                { error: 'Content must be at least 10 characters long' },
                { status: 400 }
            );
        }

        // Get the *original* article from the DB
        const articleToEdit = await prisma.article.findUnique({
            where: { id: articleId },
        });
        
        if (!articleToEdit) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        // 5. --- AUTHORIZATION CHECK ---
        // Is the logged-in user the author of this article?
        const userId = (session.user as any).id;
        if (articleToEdit.authorId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 6. All checks passed! Update the article.
        const updatedArticle = await prisma.article.update({
            where: { id: articleId },
            data: {
                title: title,
                body: body,
            },
        });

        return NextResponse.json(updatedArticle, { status: 200 });
    } catch (error) {
        console.error('Update Error:', error);
        
        return NextResponse.json(
            { error: 'Failed to update article' },
            { status: 500 }
        );
    }
}

// --- 2. GET Function (Get a single article) ---
export async function GET(request: Request, props: RouteContext) {
    const params = await props.params;
    try {
        const articleId = parseInt(params.id, 10);

        const article = await prisma.article.findUnique({
            where: { id: articleId },
            include: {
                author: true, // We might as well get the author info
            },
        });

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch article' },
            { status: 500 }
        );
    }
}

