'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comment, setComment] = useState('');
  const [nickname, setNickname] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        alert('画像ファイルを選択してください');
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    if (!nickname.trim()) {
      alert('ニックネームを入力してください');
      return;
    }

    setUploading(true);
    try {
      const presignedUrlResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: selectedFile.name,
          contentType: selectedFile.type,
        }),
      });

      if (!presignedUrlResponse.ok) {
        throw new Error('署名付きURLの取得に失敗しました');
      }

      const { signedUrl, key } = await presignedUrlResponse.json();

      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('ファイルのアップロードに失敗しました');
      }

      const saveResponse = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: selectedFile.name,
          originalName: selectedFile.name,
          s3Key: key,
          comment: comment.trim() || null,
          nickname: nickname.trim() || null,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error('データベースへの保存に失敗しました');
      }

      alert('📸 写真がアップロードされました！\n「みんなのアップロード」で確認できます。');
      router.push('/gallery');
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ アップロードに失敗しました。\nもう一度お試しください。');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            📸 写真をアップロード
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            結婚式の素敵な瞬間を<br />皆様と共有してください
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-3">
              写真を選択
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full h-12 bg-pink-50 border-2 border-dashed border-pink-300 rounded-xl text-sm text-gray-600 file:absolute file:left-0 file:top-0 file:h-full file:w-full file:bg-pink-500 file:text-white file:border-none file:rounded-xl file:font-semibold cursor-pointer hover:bg-pink-100 transition-colors"
              />
            </div>
            {selectedFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-full rounded-xl shadow-md"
                />
                <p className="text-sm text-gray-600 text-center mt-3 px-2 py-1 bg-gray-50 rounded-lg">
                  📎 {selectedFile.name}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-800 mb-3">
              ニックネーム <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="お名前やニックネームを入力してください..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-base text-gray-800 placeholder-gray-400 bg-white"
              required
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-2">
              {nickname.length}/50文字
            </p>
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-800 mb-3">
              ひとこと（任意）
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="この写真についてのコメントを入力してください..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none text-base text-gray-800 placeholder-gray-400 bg-white"
              rows={4}
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                {comment.length}/200文字
              </p>
              {comment.length > 180 && (
                <span className="text-xs text-orange-500">残り{200 - comment.length}文字</span>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || !nickname.trim() || uploading}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200 shadow-lg active:bg-pink-700 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  アップロード中...
                </>
              ) : (
                <>
                  <span className="text-xl">⬆️</span>
                  アップロード
                </>
              )}
            </button>
            
            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl text-lg transition-colors duration-200 text-center flex items-center justify-center gap-2 active:bg-gray-300"
            >
              <span className="text-xl">🏠</span>
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}