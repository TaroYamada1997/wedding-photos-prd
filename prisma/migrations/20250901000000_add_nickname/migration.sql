-- Add nickname column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'photos'
    AND column_name = 'nickname'
  ) THEN
    ALTER TABLE "public"."photos" ADD COLUMN "nickname" TEXT;
  END IF;
END $$;
