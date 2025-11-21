import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCloudFrontUrl } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const { filename, originalName, s3Key, comment, nickname } = await request.json();

    if (!filename || !originalName || !s3Key || !nickname?.trim()) {
      return NextResponse.json(
        { error: 'Filename, original name, S3 key, and nickname are required' },
        { status: 400 }
      );
    }

    const cloudFrontUrl = getCloudFrontUrl(s3Key);

    const photo = await prisma.photo.create({
      data: {
        filename,
        originalName,
        s3Key,
        cloudFrontUrl,
        comment: comment || null,
        nickname: nickname.trim(),
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error('Error saving photo:', error);
    return NextResponse.json(
      { error: 'Failed to save photo' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Fetching photos from database...');
    console.log('DATABASE_URL configured:', process.env.DATABASE_URL ? 'Yes' : 'No');

    // First check if we can connect to the database
    await prisma.$connect();
    console.log('Database connection successful');

    // Check if photos table exists by attempting to query it
    const photos = await prisma.photo.findMany({
      orderBy: { uploadedAt: 'desc' },
    });
    console.log(`Found ${photos.length} photos`);

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'Unknown error');
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');

    // Return error details for debugging in production
    return NextResponse.json({
      error: 'Database error',
      message: error instanceof Error ? error.message : 'Unknown error',
      photos: []
    }, { status: 500 });
  }
}