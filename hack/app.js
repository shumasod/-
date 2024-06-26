import React, { useState, useEffect } from 'react';

const JapaneseStyleHackedPC = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour === 18) {
        setShowAlert(true);
      }
    };

    checkTime();
    const intervalId = setInterval(checkTime, 60000); // 1分ごとにチェック

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-[#e8d3a9] bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><rect x=\"0\" y=\"0\" width=\"40\" height=\"40\" fill=\"none\" stroke=\"%23d4bc8b\" stroke-width=\"1\"/></svg>')]">
      {/* 富士山の背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7ab5e6] to-[#e8d3a9]">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#7ab5e6] clip-mountain"></div>
      </div>
      
      {/* 松の木 */}
      <div className="absolute bottom-0 left-10 w-40 h-64 bg-[#2d4f1e] clip-pine"></div>
      <div className="absolute bottom-0 right-10 w-32 h-56 bg-[#2d4f1e] clip-pine"></div>
      
      {/* 鳥居 */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-80 bg-[#b22234] clip-torii"></div>
      
      {/* メインコンテンツ */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white/80 border-8 border-[#8b4513] shadow-lg p-10 text-center transform rotate-1">
          <h1 className="text-4xl text-[#8b4513] mb-5 writing-vertical-rl text-orientation-upright inline-block font-bold" style={{fontFamily: "'Noto Serif JP', serif"}}>このPCハッキングされたよ！</h1>
          <p className="text-xl text-[#5c3317]" style={{fontFamily: "'Noto Sans JP', sans-serif"}}>セキュリティに注意してください</p>
        </div>
      </div>
      
      {/* アラート */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#e8d3a9] border-8 border-[#8b4513] p-8 text-center shadow-lg transform -rotate-1">
            <h2 className="text-3xl text-[#8b4513] mb-4 font-bold" style={{fontFamily: "'Noto Serif JP', serif"}}>警告</h2>
            <p className="text-xl text-[#5c3317] mb-6" style={{fontFamily: "'Noto Sans JP', sans-serif"}}>このPCハッキングされたよ！</p>
            <button
              onClick={() => setShowAlert(false)}
              className="bg-[#b22234] text-white px-6 py-2 text-lg hover:bg-[#8b1a1a] transition-colors font-semibold"
              style={{fontFamily: "'Noto Sans JP', sans-serif"}}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .clip-mountain {
          clip-path: polygon(0 100%, 50% 0, 100% 100%);
        }
        .clip-pine {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .clip-torii {
          clip-path: polygon(10% 10%, 90% 10%, 90% 0%, 100% 0%, 100% 20%, 90% 20%, 90% 100%, 75% 100%, 75% 20%, 25% 20%, 25% 100%, 10% 100%, 10% 20%, 0% 20%, 0% 0%, 10% 0%);
        }
      `}</style>
    </div>
  );
};

export default JapaneseStyleHackedPC;
