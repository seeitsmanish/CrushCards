import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Extract `unique_slug` from query parameters
    const url = new URL(req.url);
    const unique_slug = url.searchParams.get("unique_slug");

    if (!unique_slug) {
        return NextResponse.json({ error: 'unique_slug is required' }, { status: 400 });
    }

    try {
        // Fetch the page with the unique_slug for the user
        const page = await prisma.page.findUnique({
            where: { uniqueSlug: unique_slug },
            include: { cardType: true },
        });

        if (!page) {
            return NextResponse.json({ error: 'Page with the provided slug does not exist' }, { status: 404 });
        }

        // Update the page view count
        await prisma.page.update({
            where: { id: page.id },
            data: { views: page.views + 1 },
        });

        return NextResponse.json({ page });
    } catch (error) {
        console.error('Error fetching page:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
