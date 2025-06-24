import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { reviews } from '@/db/schema';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Parse multipart/form-data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const subject = formData.get('subject') as string;
    const rating = formData.get('rating') as string;
    const review = formData.get('review') as string;
    const photo = formData.get('photo') as File | null;

    // Validate required fields
    if (!name || !email || !rating || !review) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Invalid rating' },
        { status: 400 }
      );
    }

    let photoUrl: string | null = null;
    if (photo && typeof photo === 'object' && photo.size > 0) {
      const ext = photo.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);
      const arrayBuffer = await photo.arrayBuffer();
      await writeFile(uploadPath, Buffer.from(arrayBuffer));
      photoUrl = `/uploads/${fileName}`;
    }

    // Save review to database
    const newReview = await db.insert(reviews).values({
      name,
      email,
      role: role || null,
      subject: subject || null,
      rating: ratingNum,
      review,
      verified: false, // Default to unverified
      photoUrl,
    }).returning();

    return NextResponse.json(
      { 
        message: 'Review submitted successfully',
        review: newReview[0]
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
} 