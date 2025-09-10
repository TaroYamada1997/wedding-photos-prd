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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 px-4 py-6 relative overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-amber-900 mb-3 leading-tight tracking-wide">
            Share Your
            <span className="block text-2xl font-light text-amber-700 mt-1">
              Precious Moment
            </span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-4"></div>
          <p className="text-amber-800 text-base leading-relaxed font-light">
            あなたの大切な瞬間を<br />
            <span className="font-medium">皆様と共有してください</span>
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200/50 p-8 space-y-8">
          <div>
            <label className="block text-lg font-serif text-amber-900 mb-4 flex items-center gap-2">
              写真を選択<span className="text-rose-500 text-lg">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full h-14 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 rounded-xl text-sm text-amber-700 file:absolute file:left-0 file:top-0 file:h-full file:w-full file:bg-gradient-to-r file:from-amber-400 file:to-orange-400 file:text-white file:border-none file:rounded-xl file:font-semibold cursor-pointer hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 file:shadow-lg"
              />
            </div>
            {selectedFile && (
              <div className="mt-4">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="w-full rounded-2xl shadow-xl border border-amber-200"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-4 ring-amber-400/20"></div>
                </div>
                <p className="text-sm text-amber-700 text-center mt-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center gap-2">
                  <span>📎</span> {selectedFile.name}
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-lg font-serif text-amber-900 mb-4 flex items-center gap-2">
              <span className="text-xl"></span>
              お名前またはニックネーム <span className="text-rose-500 text-lg">*</span>
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="お名前やニックネームを入力してください..."
              className="w-full px-5 py-4 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-300/50 focus:border-amber-400 transition-all duration-300 text-base text-amber-900 placeholder-amber-400 bg-gradient-to-r from-white to-amber-50 shadow-inner"
              required
              maxLength={15}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <span>✨</span> {nickname.length}/15文字
              </p>
              {nickname.length > 12 && (
                <span className="text-xs text-orange-500">残り{15 - nickname.length}文字</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-serif text-amber-900 mb-4 flex items-center gap-2">
              ひとこと（任意）
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="なにかひとことあれば！"
              className="w-full px-5 py-4 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-300/50 focus:border-amber-400 transition-all duration-300 resize-none text-base text-amber-900 placeholder-amber-400 bg-gradient-to-r from-white to-amber-50 shadow-inner"
              rows={4}
              maxLength={50}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <span>✨</span> {comment.length}/50文字
              </p>
              {comment.length > 45 && (
                <span className="text-xs text-orange-500">残り{50 - comment.length}文字</span>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || !nickname.trim() || uploading}
              className="group w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-500 hover:via-amber-600 hover:to-orange-500 disabled:from-gray-300 disabled:via-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-98 border border-amber-300 flex items-center justify-center gap-3"
            >
              {uploading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <div>
                    <div className="font-semibold">アップロード中</div>
                    <div className="text-sm opacity-90">Please wait...</div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="font-semibold">思い出をシェアする</div>
                    <div className="text-sm opacity-90">Upload photo</div>
                  </div>
                </>
              )}
            </button>
            
            <Link
              href="/"
              className="group w-full bg-white/80 hover:bg-white border-2 border-amber-200 hover:border-amber-300 text-amber-800 hover:text-amber-900 font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <div>
                <div className="font-semibold">ホームに戻る</div>
                <div className="text-sm opacity-80">Go back</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}