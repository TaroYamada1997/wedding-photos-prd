import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCloudFrontUrl } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const { filename, originalName, s3Key, comment } = await request.json();

    if (!filename || !originalName || !s3Key) {
      return NextResponse.json(
        { error: 'Filename, original name, and S3 key are required' },
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
    
    // Check if photos table exists by attempting to count
    const photos = await prisma.photo.findMany({
      orderBy: { uploadedAt: 'desc' },
    });
    console.log(`Found ${photos.length} photos`);

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'Unknown error');
    
    // If table doesn't exist, return empty array instead of error
    if (error instanceof Error && error.message.includes('relation "photos" does not exist')) {
      console.log('Photos table does not exist, returning empty array');
      return NextResponse.json([]);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch photos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}