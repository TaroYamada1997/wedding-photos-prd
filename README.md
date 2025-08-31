# 結婚式写真アップロードアプリ

結婚式の写真をゲストがアップロードして共有できるWebアプリケーションです。AWS AmplifyにデプロイしてS3に画像を保存し、PostgreSQL(Neon)にメタデータを保存します。

## 機能

- 📸 写真のアップロード（ひとことコメント付き）
- 🖼️ アップロードされた写真の一覧表示
- ☁️ AWS S3への安全なファイルアップロード
- 🗄️ PostgreSQLでのメタデータ管理
- 📱 レスポンシブデザイン

## 技術スタック

- **フロントエンド**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **バックエンド**: Next.js API Routes
- **データベース**: PostgreSQL (Neon)
- **ファイルストレージ**: AWS S3
- **CDN**: CloudFront
- **デプロイ**: AWS Amplify
- **ORM**: Prisma

## セットアップ

### 1. プロジェクトのクローン

```bash
git clone <リポジトリURL>
cd wedding-photos
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成して以下の環境変数を設定してください：

```bash
# Database
DATABASE_URL="postgresql://username:password@hostname:port/database_name"

# AWS
AWS_REGION="ap-northeast-1"
AWS_S3_BUCKET_NAME="your-wedding-photos-bucket"
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
CLOUDFRONT_DOMAIN="your-cloudfront-domain.cloudfront.net"

# Next.js
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 3. データベースセットアップ

#### Neon PostgreSQLの設定
1. [Neon](https://neon.tech/)でアカウントを作成
2. 新しいプロジェクトとデータベースを作成
3. 接続文字列を`DATABASE_URL`に設定

#### Prismaマイグレーション
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. AWS設定

#### S3バケットの作成
1. AWS S3でバケットを作成
2. バケットにCORSを設定：

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

#### CloudFrontの設定
1. S3バケット用のCloudFrontディストリビューションを作成
2. ドメイン名を`CLOUDFRONT_DOMAIN`に設定

#### IAMユーザーの作成
S3への読み書き権限を持つIAMユーザーを作成し、アクセスキーを環境変数に設定

### 5. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## AWS Amplifyデプロイ

### 1. Amplifyアプリの作成
1. AWS Amplifyコンソールでアプリを作成
2. GitHubリポジトリと連携
3. ビルド設定は`amplify.yml`を使用

### 2. 環境変数の設定
Amplifyコンソールで環境変数を設定：
- `DATABASE_URL`
- `AWS_REGION`
- `AWS_S3_BUCKET_NAME`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DOMAIN`

## ディレクトリ構造

```
wedding-photos/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload/route.ts    # 署名付きURL生成
│   │   │   └── photos/route.ts    # 写真CRUD操作
│   │   ├── upload/page.tsx        # アップロードページ
│   │   ├── gallery/page.tsx       # 一覧ページ
│   │   └── page.tsx               # ホームページ
│   └── lib/
│       ├── s3.ts                  # AWS S3関連
│       └── db.ts                  # Prismaクライアント
├── prisma/
│   └── schema.prisma              # データベーススキーマ
└── amplify.yml                    # Amplifyビルド設定
```

## データベーススキーマ

```prisma
model Photo {
  id            String   @id @default(cuid())
  filename      String
  originalName  String
  s3Key         String   @unique
  cloudFrontUrl String
  comment       String?
  uploadedAt    DateTime @default(now())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 使い方

1. **写真アップロード**: トップページから「写真をアップロード」をクリック
2. **コメント追加**: 写真と一緒にひとことコメントを追加可能
3. **一覧表示**: 「みんなのアップロード」で全ての写真を確認

## ライセンス

MIT
