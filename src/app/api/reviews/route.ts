import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { reviews } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const verifiedOnly = searchParams.get('verified') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let allReviews;
    
    if (verifiedOnly) {
      allReviews = await db
        .select()
        .from(reviews)
        .where(eq(reviews.verified, true))
        .orderBy(desc(reviews.createdAt))
        .limit(limit)
        .offset(offset);
    } else {
      allReviews = await db
        .select()
        .from(reviews)
        .orderBy(desc(reviews.createdAt))
        .limit(limit)
        .offset(offset);
    }

    return NextResponse.json({ reviews: allReviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
} 