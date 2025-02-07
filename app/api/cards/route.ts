import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const cardTypes = await prisma.cardType.findMany()
        return NextResponse.json(cardTypes)
    } catch (error) {
        console.error('Error fetching card types:', error)
        return NextResponse.json({ error: 'Failed to fetch card types' }, { status: 500 })
    }
}