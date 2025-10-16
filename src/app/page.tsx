import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 px-4 py-8 relative overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="text-6xl mb-4">💍</div>
            <h1 className="text-4xl font-serif text-amber-900 mb-4 leading-tight tracking-wide">
              Shota <span className="text-2xl">&</span> Yukina<br />
              Wedding
              <span className="block text-2xl font-light text-amber-700 mt-1">
                Photo Contest
              </span>
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-6"></div>
          </div>
          <p className="text-lg text-amber-800 leading-relaxed font-light">
            素敵な瞬間を撮影して<br />
            <span className="font-medium">フォトコンテストに参加しよう！</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-5 mb-12">
          <Link
            href="/upload"
            className="group w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 hover:from-amber-500 hover:via-amber-600 hover:to-orange-500 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-4 active:scale-98 border border-amber-300"
          >
            <div>
              <div className="text-lg font-semibold">写真をアップロード</div>
              <div className="text-sm opacity-90 font-light text-center">Share your moment</div>
            </div>
          </Link>
          
          <Link
            href="/gallery"
            className="group w-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-4 active:scale-98 border border-rose-300"
          >
            <div>
              <div className="text-lg font-semibold">みんなの写真</div>
              <div className="text-sm opacity-90 font-light text-center">View memories</div>
            </div>
          </Link>
        </div>

        {/* Instructions Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-amber-200/50">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif text-amber-900 mb-2">
              How to Use
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto"></div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1 shadow-lg">
                1
              </div>
              <div>
                <h3 className="text-amber-900 font-semibold mb-1">ベストショットを撮影</h3>
                <p className="text-amber-700 leading-relaxed text-sm">
                  結婚式の素敵な瞬間を写真に収めてください
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1 shadow-lg">
                2
              </div>
              <div>
                <h3 className="text-amber-900 font-semibold mb-1">写真をアップロード</h3>
                <p className="text-amber-700 leading-relaxed text-sm">
                  ニックネームと共にコンテストに応募してください
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1 shadow-lg">
                3
              </div>
              <div>
                <h3 className="text-amber-900 font-semibold mb-1">他の作品も楽しむ</h3>
                <p className="text-amber-700 leading-relaxed text-sm">
                  ゲストの皆様の作品をギャラリーでご覧ください
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-amber-600 text-sm font-light">
            Made with 💝 for your special day
          </p>
        </div>
      </div>
    </div>
  );
}
