# Neon コネクションプーリング設定ガイド

## 概要
このガイドでは、Neonデータベースのコネクションプーリングを設定する方法を説明します。
結婚式で50人以上が同時アクセスする場合、コネクションプーリングを使用しないとNeonの同時接続数制限（100接続）に達する可能性があります。

## 設定手順

### 1. NeonダッシュボードでPooled Connection Stringを取得

1. [Neon Console](https://console.neon.tech) にログイン
2. プロジェクトを選択
3. "Connection Details" セクションを開く
4. **"Pooled connection"** タブを選択
5. 接続文字列をコピー（以下のような形式）:
   ```
   postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require
   ```

### 2. 環境変数を更新

#### ローカル開発環境（`.env.local`）
```bash
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require&connection_limit=5&pool_timeout=20"
```

#### 本番環境（AWS Amplify）
1. AWS Amplify Console を開く
2. アプリケーションを選択
3. "Environment variables" に移動
4. `DATABASE_URL` を更新:
   ```
   postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/db?sslmode=require&connection_limit=5&pool_timeout=20
   ```

### 3. パラメータの説明

- `connection_limit=5`: 各Amplifyインスタンスが使用する最大コネクション数
- `pool_timeout=20`: コネクションプールからの接続取得タイムアウト（秒）
- `sslmode=require`: SSL接続を必須にする（Neonの推奨設定）

### 4. 動作確認

```bash
# ローカルで確認
npm run dev

# ブラウザで以下にアクセス
http://localhost:3000/api/photos
```

エラーが出なければ設定成功です。

## トラブルシューティング

### エラー: "Too many connections"
- `connection_limit` の値を下げてください（推奨: 3-5）
- Neonのプラン制限を確認してください

### エラー: "Connection timeout"
- `pool_timeout` の値を増やしてください（推奨: 20-30秒）
- ネットワーク接続を確認してください

## 緊急時のリカバリ手順

もし本番環境で問題が発生した場合:

```bash
# mainブランチに戻す
git checkout main
git push origin main --force

# Amplifyで自動デプロイが走ります
```

または、AWS Amplify Consoleから以前のデプロイメントにロールバックすることも可能です。

## 参考リンク

- [Neon Connection Pooling](https://neon.tech/docs/connect/connection-pooling)
- [Prisma with Neon](https://www.prisma.io/docs/guides/database/neon)
