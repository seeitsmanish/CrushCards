import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; // Import getAuth from Clerk
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export async function GET(req: Request) {
    const { userId } = await auth()


    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const pages = await prisma.page.findMany({
            where: { userId: userId },
            include: {
                cardType: true,
            },
        });

        const canCreateMore = pages.length < 10;

        return NextResponse.json({ pages, canCreateMore });
    } catch (error) {
        console.error('Error fetching pages:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { title, cards, cardTypeId } = await req.json();
    const { userId } = await auth()


    if (!userId || !title || !cards || !cardTypeId) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (cards.length === 0 || cards.length > 10) {
        return NextResponse.json({ error: 'You must provide between 1 and 10 cards' }, { status: 400 });
    }

    try {
        const slugifiedTitle = title.toLowerCase().replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^\w-]+/g, ''); // Remove non-word characters
        const uniqueSlug = `${slugifiedTitle}-${uuidv4()}`; // Combine slugified title with UUID
        const newPage = await prisma.page.create({
            data: {
                title,
                userId,
                cards,
                cardTypeId,
                uniqueSlug,
            },
        });

        return NextResponse.json(newPage, { status: 201 });
    } catch (error) {
        console.error('Error creating page:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const pageId = url.searchParams.get("pageId");
    const { userId } = await auth()


    if (!userId || !pageId) {
        return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    try {
        await prisma.page.deleteMany({
            where: {
                id: pageId,
                userId: userId,
            },
        });

        return NextResponse.json({ message: 'Page deleted successfully' });
    } catch (error) {
        console.error('Error deleting page:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const { pageId, title, cards, cardTypeId } = await req.json();
    const { userId } = await auth()


    if (!userId || !pageId || !title || !cards || !cardTypeId) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (cards.length === 0 || cards.length > 10) {
        return NextResponse.json({ error: 'You must provide between 1 and 10 cards' }, { status: 400 });
    }

    try {
        const updatedPage = await prisma.page.update({
            where: { id: pageId },
            data: {
                title,
                cardTypeId,
                cards: { deleteMany: {}, create: cards }, // Clear existing cards and add new ones
            },
        });

        return NextResponse.json(updatedPage);
    } catch (error) {
        console.error('Error updating page:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 