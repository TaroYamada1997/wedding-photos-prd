import { NextRequest, NextResponse } from 'next/server';
import { generatePresignedUrl } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called');
    console.log('Environment check:', {
      S3_REGION: process.env.S3_REGION ? '✓' : '✗',
      S3_BUCKET_NAME: process.env.S3_BUCKET_NAME ? '✓' : '✗',
      S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID ? '✓' : '✗',
      S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY ? '✓' : '✗'
    });

    const { filename, contentType } = await request.json();
    console.log('Request data:', { filename, contentType });

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: 'Filename and content type are required' },
        { status: 400 }
      );
    }

    console.log('Generating presigned URL...');
    const { signedUrl, key } = await generatePresignedUrl(filename, contentType);
    console.log('Generated presigned URL successfully');

    return NextResponse.json({
      signedUrl,
      key,
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      { 
        error: 'Failed to generate upload URL',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}