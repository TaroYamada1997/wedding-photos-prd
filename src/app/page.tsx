import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3 leading-tight">
            結婚式の思い出
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            皆様からの素敵な写真を<br />お待ちしています
          </p>
        </div>

        <div className="space-y-4 mb-10">
          <Link
            href="/upload"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-5 px-6 rounded-xl text-lg transition-colors duration-200 shadow-lg flex items-center justify-center gap-3 active:bg-pink-700"
          >
            <span className="text-2xl">📸</span>
            写真をアップロード
          </Link>
          
          <Link
            href="/gallery"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-5 px-6 rounded-xl text-lg transition-colors duration-200 shadow-lg flex items-center justify-center gap-3 active:bg-purple-700"
          >
            <span className="text-2xl">🖼️</span>
            みんなのアップロード
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
            使い方
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <p className="text-gray-700 leading-relaxed">
                「写真をアップロード」から写真を選択してアップロード
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <p className="text-gray-700 leading-relaxed">
                写真にひとことコメントを添えることができます
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              <p className="text-gray-700 leading-relaxed">
                「みんなのアップロード」で皆様の写真を一覧で確認
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
