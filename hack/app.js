import React, { useState, useEffect } from 'react';

const JapaneseSeasonalDisplay = () => {
  const [currentSeason, setCurrentSeason] = useState('春');
  const [showMessage, setShowMessage] = useState(false);

  const seasons = {
    春: { color: '#f8b8d3', message: '桜舞う春、美しき日本の始まり' },
    夏: { color: '#7ab5e6', message: '清涼なる夏、風鈴の音色響く' },
    秋: { color: '#d6802d', message: '紅葉彩る秋、実りの季節' },
    冬: { color: '#e8f4f8', message: '静寂の冬、雪化粧の風景' }
  };

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('春');
    else if (month >= 5 && month <= 7) setCurrentSeason('夏');
    else if (month >= 8 && month <= 10) setCurrentSeason('秋');
    else setCurrentSeason('冬');

    const timer = setTimeout(() => setShowMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative h-screen overflow-hidden transition-colors duration-1000 ease-in-out bg-[${seasons[currentSeason].color}]`}>
      {/* 富士山の背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#7ab5e6] clip-mountain opacity-50"></div>
      </div>
      
      {/* 季節に応じた装飾 */}
      {currentSeason === '春' && (
        <div className="absolute inset-0 animate-fall">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-4 h-4 bg-pink-200 rounded-full" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `fall ${5 + Math.random() * 10}s linear infinite`
            }}></div>
          ))}
        </div>
      )}
      {currentSeason === '夏' && (
        <div className="absolute bottom-10 left-10 w-20 h-40 bg-green-700 clip-bamboo"></div>
      )}
      {currentSeason === '秋' && (
        <div className="absolute inset-0 animate-fall">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-5 h-5 bg-red-500 rotate-45" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `fall ${5 + Math.random() * 10}s linear infinite`
            }}></div>
          ))}
        </div>
      )}
      {currentSeason === '冬' && (
        <div className="absolute inset-0 animate-fall">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-white rounded-full" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `fall ${3 + Math.random() * 5}s linear infinite`
            }}></div>
          ))}
        </div>
      )}
      
      {/* 鳥居 */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-80 bg-[#b22234] clip-torii"></div>
      
      {/* メインコンテンツ */}
      <div className="relative z-10 flex justify-center items-center h-full">
        {showMessage && (
          <div className="bg-white/80 border-8 border-[#8b4513] shadow-lg p-10 text-center transform rotate-1 animate-fadeIn">
            <h1 className="text-4xl text-[#8b4513] mb-5 writing-vertical-rl text-orientation-upright inline-block font-bold" style={{fontFamily: "'Noto Serif JP', serif"}}>
              {seasons[currentSeason].message}
            </h1>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .clip-mountain {
          clip-path: polygon(0 100%, 50% 0, 100% 100%);
        }
        .clip-bamboo {
          clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
        }
        .clip-torii {
          clip-path: polygon(10% 10%, 90% 10%, 90% 0%, 100% 0%, 100% 20%, 90% 20%, 90% 100%, 75% 100%, 75% 20%, 25% 20%, 25% 100%, 10% 100%, 10% 20%, 0% 20%, 0% 0%, 10% 0%);
        }
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fall {
          animation: fall 10s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JapaneseSeasonalDisplay;
