import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST() {
  try {
    console.log('Running database migration...');
    
    // Try to create the photos table if it doesn't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "photos" (
        "id" TEXT NOT NULL,
        "filename" TEXT NOT NULL,
        "originalName" TEXT NOT NULL,
        "s3Key" TEXT NOT NULL,
        "cloudFrontUrl" TEXT NOT NULL,
        "comment" TEXT,
        "nickname" TEXT,
        "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
      );
    `;
    
    // Add nickname column if it doesn't exist (for existing tables)
    await prisma.$executeRaw`
      ALTER TABLE "photos" ADD COLUMN IF NOT EXISTS "nickname" TEXT;
    `;
    
    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "photos_s3Key_key" ON "photos"("s3Key");
    `;
    
    console.log('Migration completed successfully');
    return NextResponse.json({ success: true, message: 'Migration completed' });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}