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
    const photos = await prisma.photo.findMany({
      orderBy: { uploadedAt: 'desc' },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}