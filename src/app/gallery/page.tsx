'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Photo {
  id: string;
  filename: string;
  originalName: string;
  cloudFrontUrl: string;
  comment: string | null;
  uploadedAt: string;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        if (!response.ok) {
          throw new Error('写真の取得に失敗しました');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError('写真の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 font-medium">📷 写真を読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">😞</div>
            <p className="text-red-600 text-lg mb-6 font-medium">{error}</p>
            <Link
              href="/"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-colors active:bg-pink-700 flex items-center justify-center gap-2"
            >
              <span className="text-xl">🏠</span>
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            🖼️ みんなのアップロード
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            皆様から投稿された<br />素敵な写真たち
          </p>
          <div className="space-y-2">
            <Link
              href="/upload"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl transition-colors active:bg-pink-700 flex items-center justify-center gap-2"
            >
              <span className="text-lg">📸</span>
              写真をアップロード
            </Link>
            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors active:bg-gray-300 flex items-center justify-center gap-2"
            >
              <span className="text-lg">🏠</span>
              ホームに戻る
            </Link>
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📷</div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              まだ写真がありません
            </h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              結婚式の素敵な瞬間を<br />シェアしてください！
            </p>
            <Link
              href="/upload"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-colors active:bg-pink-700 flex items-center justify-center gap-2"
            >
              <span className="text-xl">✨</span>
              最初の写真をアップロード
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={photo.cloudFrontUrl}
                      alt={photo.originalName}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  <div className="p-4">
                    {photo.comment && (
                      <div className="mb-3">
                        <p className="text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg">
                          💬 {photo.comment}
                        </p>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 space-y-1">
                      <p className="flex items-center gap-1">
                        <span>📎</span>
                        {photo.originalName}
                      </p>
                      <p className="flex items-center gap-1">
                        <span>🕐</span>
                        {new Date(photo.uploadedAt).toLocaleString('ja-JP', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center bg-white/70 rounded-xl p-4">
              <p className="text-gray-600 font-medium">
                📊 全 {photos.length} 枚の写真が投稿されています
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}