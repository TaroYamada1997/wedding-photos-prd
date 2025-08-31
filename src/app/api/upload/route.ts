import { NextRequest, NextResponse } from 'next/server';
import { generatePresignedUrl } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: 'Filename and content type are required' },
        { status: 400 }
      );
    }

    const { signedUrl, key } = await generatePresignedUrl(filename, contentType);

    return NextResponse.json({
      signedUrl,
      key,
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}