'use client';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 px-4 py-8 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Main Thank You Section */}
        <div className="text-center mb-12">
          <div className="mb-8 animate-bounce-slow">
            <div className="text-8xl mb-6">💝</div>
          </div>
          <h1 className="text-5xl font-serif text-amber-900 mb-6 leading-tight tracking-wide">
            Thank You
            <span className="block text-3xl font-light text-amber-700 mt-3">
              ありがとうございました
            </span>
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-8"></div>
        </div>

        {/* Main Message Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-200/50 p-10 mb-8">
          <div className="space-y-6 text-center">
            <p className="text-xl text-amber-900 leading-relaxed font-serif">
              フォトコンテストへのご参加、<br />
              誠にありがとうございました！
            </p>

            <div className="py-6">
              <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-6"></div>
              <p className="text-lg text-amber-800 leading-loose">
                皆さまの温かいお祝いの気持ちと<br />
                素敵な写真の数々に<br />
                心から感謝申し上げます
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl p-6 border border-amber-200">
              <p className="text-base text-amber-800 leading-relaxed">
                皆さまからいただいた写真は<br />
                私たちの宝物です🤩<br />
                <span className="block mt-3 font-medium text-amber-900">
                  本当にありがとうございました！
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 p-8">
            <p className="text-amber-800 text-lg font-serif mb-4">
              Shota & Yukina
            </p>
            <div className="flex items-center justify-center gap-3 text-3xl mb-4">
              <span>💍</span>
              <span className="text-rose-400">💕</span>
              <span>💍</span>
            </div>
            <p className="text-amber-600 text-sm font-light">
              Made with 💝 for our special day
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
