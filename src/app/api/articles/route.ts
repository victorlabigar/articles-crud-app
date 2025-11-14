import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Read all articles (GET method)
export async function GET() {
    try {
        const articles = await prisma.article.findMany();

        return NextResponse.json(articles)

    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch articles'},
            {status: 500}
        )
    }
}

// Create new article
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { title, body, author } = data;

        // Validation of the input
        if(!title) {
            return NextResponse.json(
                { error: 'Title is required'},
                { status: 400}
            );
        }

        if(!body || body.length < 10) {
            return NextResponse.json(
                { error: 'Body is required and must be at least 10 characters long'},
                { status: 400}
            );
        }

        // using prisma to create a new article in the database

        const newArticle = await prisma.article.create({
            data: {
                title,
                body,
                author
            }
        });

        return NextResponse.json(newArticle, { status: 201});
    } catch(error) {
        return NextResponse.json(
            { error: 'Failed to create article' },
            { status: 500 }
        );
    }
}