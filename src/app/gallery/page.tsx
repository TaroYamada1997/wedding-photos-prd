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
  nickname: string | null;
  uploadedAt: string;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 px-4 py-8 relative overflow-hidden">
        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-amber-300 border-t-amber-500 rounded-full animate-spin mx-auto mb-6 shadow-lg"></div>
            <h2 className="text-2xl font-serif text-amber-900 mb-3">Loading...</h2>
            <p className="text-amber-700 font-light">Loading precious moments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 px-4 py-8 relative overflow-hidden">
        <div className="absolute bottom-32 left-6 text-5xl opacity-10 animate-pulse delay-1000">✨</div>
        <div className="max-w-md mx-auto relative z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/50 p-8 text-center">
            <div className="text-5xl mb-6">😢</div>
            <h2 className="text-2xl font-serif text-amber-900 mb-4">おっと...</h2>
            <p className="text-amber-700 text-lg mb-8 font-light leading-relaxed">{error}</p>
            <Link
              href="/"
              className="group w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-500 hover:via-amber-600 hover:to-orange-500 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-98 border border-amber-300 flex items-center justify-center gap-3"
            >
              <div>
                <div className="font-semibold">ホームに戻る</div>
                <div className="text-sm opacity-90">Go back home</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 px-4 py-6 relative overflow-hidden">      
      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-amber-900 mb-3 leading-tight tracking-wide">
            Photo Contest
            <span className="block text-2xl font-light text-amber-700 mt-1">
              Photo Gallery
            </span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-4"></div>
          <p className="text-amber-800 text-base leading-relaxed font-light mb-6">
          </p>
          <div className="space-y-3">
            <Link
              href="/upload"
              className="group w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-500 hover:via-amber-600 hover:to-orange-500 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-98 border border-amber-300 flex items-center justify-center gap-3"
            >
              <div>
                <div className="font-semibold">写真をアップロード</div>
                <div className="text-xs opacity-90">Share your moment</div>
              </div>
            </Link>
            <Link
              href="/"
              className="group w-full bg-white/80 hover:bg-white border-2 border-amber-200 hover:border-amber-300 text-amber-800 hover:text-amber-900 font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <div>
                <div className="font-semibold">ホームに戻る</div>
                <div className="text-xs opacity-80">Go back home</div>
              </div>
            </Link>
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/50 p-10 text-center">
            <h2 className="text-2xl font-serif text-amber-900 mb-4">
              まだ写真がありません
            </h2>
            <p className="text-amber-700 text-base mb-8 leading-relaxed font-light">
              結婚式の素敵な瞬間を<br />
              <span className="font-medium">共有してください</span>
            </p>
            <Link
              href="/upload"
              className="group w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-500 hover:via-amber-600 hover:to-orange-500 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-98 border border-amber-300 flex items-center justify-center gap-4"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
              <div>
                <div className="font-semibold">最初の写真を投稿</div>
                <div className="text-sm opacity-90">Be the first to share</div>
              </div>
            </Link>
          </div>
        ) : (
          <>
            {/* Instagram-style Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-amber-100"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo.cloudFrontUrl}
                    alt={photo.originalName}
                    fill
                    className="object-contain bg-gradient-to-br from-amber-50 to-rose-50 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  
                  {/* Instagram-style overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      {photo.nickname && (
                        <p className="text-sm font-semibold mb-1">
                          {photo.nickname}
                        </p>
                      )}
                      {photo.comment && (
                        <p className="text-xs opacity-90 line-clamp-2 px-2">
                          {photo.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo count with Instagram-style design */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-amber-200/50">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400"></div>
                <p className="text-amber-800 font-medium text-sm">
                  {photos.length} entries submitted
                </p>
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400"></div>
              </div>
            </div>
          </>
        )}

        {/* Elegant Image Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300" onClick={() => setSelectedPhoto(null)}>
            <div className="relative max-w-5xl max-h-full w-full flex flex-col animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
              {/* Instagram-style Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
              >
                <span className="text-lg">×</span>
              </button>
              
              {/* Header with username - above image */}
              {selectedPhoto.nickname && (
                <div className="bg-white p-4 border-b border-gray-200 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">{selectedPhoto.nickname.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedPhoto.nickname}</span>
                  </div>
                </div>
              )}
              
              {/* Instagram-style Image Container */}
              <div className={`relative bg-white overflow-hidden ${!selectedPhoto.nickname ? 'rounded-t-lg' : ''}`} style={{ minHeight: '60vh', maxHeight: '80vh' }}>
                <Image
                  src={selectedPhoto.cloudFrontUrl}
                  alt={selectedPhoto.originalName}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              
              {/* Instagram-style Info Section */}
              <div className="bg-white rounded-b-lg border-t border-gray-200">
                
                {/* Comment section */}
                {selectedPhoto.comment && (
                  <div className="p-4">
                    <p className="text-gray-900">{selectedPhoto.comment}</p>
                  </div>
                )}
                
                {/* Timestamp */}
                <div className="px-4 pb-4">
                  <span className="text-xs text-gray-500 uppercase">
                    {new Date(selectedPhoto.uploadedAt).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}