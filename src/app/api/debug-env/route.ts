import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  let dbConnectionStatus = 'UNKNOWN';
  let dbError = null;
  let tableExists = false;
  
  try {
    await prisma.$connect();
    dbConnectionStatus = 'CONNECTED';
    
    try {
      await prisma.photo.findFirst();
      tableExists = true;
    } catch (error) {
      if (error instanceof Error && error.message.includes('relation "photos" does not exist')) {
        tableExists = false;
      } else {
        dbError = error instanceof Error ? error.message : 'Unknown table check error';
      }
    }
  } catch (error) {
    dbConnectionStatus = 'FAILED';
    dbError = error instanceof Error ? error.message : 'Unknown connection error';
  }

  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    S3_REGION: process.env.S3_REGION ? 'SET' : 'NOT SET',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'NOT SET',
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
    CLOUDFRONT_DOMAIN: process.env.CLOUDFRONT_DOMAIN || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_CONNECTION: dbConnectionStatus,
    PHOTOS_TABLE_EXISTS: tableExists,
    DB_ERROR: dbError,
    ALL_ENV_KEYS: Object.keys(process.env).filter(key => 
      key.startsWith('DATABASE_') || 
      key.startsWith('S3_') || 
      key.startsWith('CLOUDFRONT_')
    )
  });
}