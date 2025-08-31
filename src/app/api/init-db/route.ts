import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST() {
  try {
    // Try to create the database schema
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "photos" (
          "id" TEXT NOT NULL,
          "filename" TEXT NOT NULL,
          "originalName" TEXT NOT NULL,
          "s3Key" TEXT NOT NULL,
          "cloudFrontUrl" TEXT NOT NULL,
          "comment" TEXT,
          "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
      );
    `;

    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "photos_s3Key_key" ON "photos"("s3Key");
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully' 
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}