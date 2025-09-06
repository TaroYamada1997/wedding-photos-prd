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
            <div className="space-y-6 mb-8">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/50 overflow-hidden">
                  <div 
                    className="relative aspect-square cursor-pointer hover:opacity-95 transition-all duration-300 group"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <Image
                      src={photo.cloudFrontUrl}
                      alt={photo.originalName}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg border border-amber-200">
                        <span className="text-2xl">🔍</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-400/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      タップして拡大
                    </div>
                  </div>
                  <div className="p-6">
                    {photo.nickname && (
                      <div className="mb-4">
                        <p className="text-base font-semibold text-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 px-4 py-3 rounded-xl flex items-center gap-2">
                          <span className="text-lg">💝</span> {photo.nickname}
                        </p>
                      </div>
                    )}
                    {photo.comment && (
                      <div className="mb-4">
                        <p className="text-amber-900 leading-relaxed bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 p-4 rounded-xl flex items-start gap-2">
                          <span className="text-lg flex-shrink-0 mt-0.5">💭</span>
                          <span>{photo.comment}</span>
                        </p>
                      </div>
                    )}
                    <div className="text-sm text-amber-600 space-y-2 bg-amber-50/50 p-3 rounded-xl">
                      <p className="flex items-center gap-2">
                        <span className="text-base">📎</span>
                        <span className="font-light">{photo.originalName}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-base">🕰️</span>
                        <span className="font-light">{new Date(photo.uploadedAt).toLocaleString('ja-JP', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center bg-white/90 backdrop-blur-md rounded-2xl border border-amber-200/50 p-6 shadow-lg">
              <div className="text-3xl mb-3">🎉</div>
              <p className="text-amber-800 font-serif text-lg mb-1">
                素敵な思い出が {photos.length} 枚
              </p>
              <p className="text-amber-600 text-sm font-light">
                Everyone's precious moments
              </p>
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