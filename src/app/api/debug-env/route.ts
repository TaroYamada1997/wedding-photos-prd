import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    S3_REGION: process.env.S3_REGION ? 'SET' : 'NOT SET',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'NOT SET',
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
    CLOUDFRONT_DOMAIN: process.env.CLOUDFRONT_DOMAIN || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    ALL_ENV_KEYS: Object.keys(process.env).filter(key => 
      key.startsWith('DATABASE_') || 
      key.startsWith('S3_') || 
      key.startsWith('CLOUDFRONT_')
    )
  });
}