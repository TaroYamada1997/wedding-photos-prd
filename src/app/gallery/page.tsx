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
        <div className="absolute bottom-32 left-6 text-5xl opacity-10 animate-pulse delay-1000">✨</div>
        <div className="max-w-md mx-auto relative z-10">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-amber-300 border-t-amber-500 rounded-full animate-spin mx-auto mb-6 shadow-lg"></div>
            <h2 className="text-2xl font-serif text-amber-900 mb-3">思い出を読み込み中</h2>
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
            Wedding
            <span className="block text-2xl font-light text-amber-700 mt-1">
              Photo Gallery
            </span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-4"></div>
          <p className="text-amber-800 text-base leading-relaxed font-light mb-6">
            皆様からの素敵な<br />
            <span className="font-medium">思い出をご覧ください</span>
          </p>
          <div className="space-y-3">
            <Link
              href="/upload"
              className="group w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-500 hover:via-amber-600 hover:to-orange-500 text-white font-semibold py-4 px-6 rounded-2xl text-base transition-all duration-300 shadow-lg hover:shadow-xl active:scale-98 border border-amber-300 flex items-center justify-center gap-3"
            >
              <div>
                <div className="font-semibold">写真をアップロード</div>
                <div className="text-xs opacity-90">Share your moment</div>
              </div>
            </Link>
            <Link
              href="/"
              className="group w-full bg-white/80 hover:bg-white border-2 border-amber-200 hover:border-amber-300 text-amber-800 hover:text-amber-900 font-semibold py-4 px-6 rounded-2xl text-base transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-3 backdrop-blur-sm"
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
            <div className="text-6xl mb-6">🌸</div>
            <h2 className="text-2xl font-serif text-amber-900 mb-4">
              まだ写真がありません
            </h2>
            <p className="text-amber-700 text-base mb-8 leading-relaxed font-light">
              結婚式の素敵な瞬間を<br />
              <span className="font-medium">皆様と共有してください</span>
            </p>
            <Link
              href="/upload"
              className="group w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-500 hover:via-amber-600 hover:to-orange-500 text-white font-semibold py-5 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-98 border border-amber-300 flex items-center justify-center gap-4"
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
                  
                  {/* Overlay with info preview */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-2 left-2 right-2">
                      {photo.nickname && (
                        <p className="text-white text-xs font-semibold mb-1 truncate">
                          💝 {photo.nickname}
                        </p>
                      )}
                      {photo.comment && (
                        <p className="text-white text-xs opacity-90 line-clamp-2 leading-tight">
                          {photo.comment}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover zoom indicator */}
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                    <span className="text-amber-600 text-sm">🔍</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo count with Instagram-style design */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-amber-200/50">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400"></div>
                <p className="text-amber-800 font-medium text-sm">
                  {photos.length} photos shared
                </p>
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400"></div>
              </div>
            </div>
          </>
        )}

        {/* Elegant Image Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-amber-900/20 to-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="relative max-w-4xl max-h-full w-full h-full flex flex-col animate-in zoom-in-95 duration-300">
              {/* Elegant Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-20 bg-white/95 hover:bg-white text-amber-800 hover:text-amber-900 rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-amber-200"
              >
                <span className="text-2xl font-light">×</span>
              </button>
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 left-4 text-2xl text-white/20 z-10">✨</div>
              <div className="absolute bottom-4 right-4 text-2xl text-white/20 z-10">🌸</div>
              
              {/* Image Container with Elegant Frame */}
              <div className="flex-1 relative mb-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src={selectedPhoto.cloudFrontUrl}
                  alt={selectedPhoto.originalName}
                  fill
                  className="object-contain bg-white/5"
                  sizes="100vw"
                />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10"></div>
              </div>
              
              {/* Elegant Photo Info Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/50 p-6 space-y-4 max-h-40 overflow-y-auto">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400"></div>
                </div>
                
                {selectedPhoto.nickname && (
                  <div className="text-center">
                    <p className="text-lg font-serif text-amber-900 flex items-center justify-center gap-2">
                      <span className="text-xl">💝</span> {selectedPhoto.nickname}
                    </p>
                  </div>
                )}
                
                {selectedPhoto.comment && (
                  <div className="text-center">
                    <p className="text-amber-800 leading-relaxed font-light italic flex items-start justify-center gap-2 text-base">
                      <span className="text-lg flex-shrink-0 mt-0.5">💭</span>
                      <span>"{selectedPhoto.comment}"</span>
                    </p>
                  </div>
                )}
                
                <div className="flex justify-center gap-6 text-sm text-amber-600 font-light pt-3 border-t border-amber-200/50">
                  <span className="flex items-center gap-1">
                    <span>📷</span> {selectedPhoto.originalName}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🕰️</span> {new Date(selectedPhoto.uploadedAt).toLocaleString('ja-JP', {
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