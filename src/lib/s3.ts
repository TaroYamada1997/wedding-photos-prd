import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

console.log('S3 Configuration:', {
  region: process.env.S3_REGION || 'MISSING',
  bucketName: process.env.S3_BUCKET_NAME || 'MISSING',
  accessKeyId: process.env.S3_ACCESS_KEY_ID ? 'SET' : 'MISSING',
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ? 'SET' : 'MISSING'
});

const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function generatePresignedUrl(filename: string, contentType: string) {
  const key = `photos/${Date.now()}-${filename}`;
  
  const bucketName = process.env.S3_BUCKET_NAME || 'shota-wedding-photos-bucket';
  console.log('Using bucket name:', bucketName);
  
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600, // 1 hour
  });

  return {
    signedUrl,
    key,
  };
}

export function getCloudFrontUrl(key: string): string {
  return `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`;
}