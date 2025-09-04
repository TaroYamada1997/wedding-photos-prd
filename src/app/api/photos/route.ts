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
    
    // If table doesn't exist or database connection fails, return empty array instead of error
    if (error instanceof Error && (
      error.message.includes('relation "photos" does not exist') ||
      error.message.includes('does not exist') ||
      error.message.includes('table') ||
      error.message.includes('P2021') // Prisma table doesn't exist error
    )) {
      console.log('Photos table does not exist or database error, returning empty array');
      return NextResponse.json([]);
    }
    
    // For other errors, still return empty array to avoid breaking the UI
    console.log('Unknown database error, returning empty array for safety');
    return NextResponse.json([]);
  }
}