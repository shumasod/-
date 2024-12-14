import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock } from 'lucide-react';

const YayoiGohan = () => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [lastCallTime, setLastCallTime] = useState(null);

  useEffect(() => {
    const checkDinnerTime = () => {
      const now = new Date();
      if (now.getHours() === 18 && !isActive && count < 1000) {
        setIsActive(true);
      }
    };

    const interval = setInterval(checkDinnerTime, 60000);
    return () => clearInterval(interval);
  }, [isActive, count]);

  const handleCall = () => {
    if (count >= 1000) return;
    
    const now = new Date();
    setLastCallTime(now);
    setCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      {/* ヘッダー部分 */}
      <div className="w-full bg-[#8B4513] text-white p-4 fixed top-0 left-0 shadow-lg z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sample</h1>
          <div className="text-sm">営業時間 11:00-22:00</div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-3xl mx-auto mt-20 p-4">
        <Card className="bg-white shadow-lg border-none">
          <div className="p-6">
            {/* お知らせ部分 */}
            <div className="bg-amber-100 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">本日のお知らせ</span>
              </div>
              <p className="mt-2 text-amber-800">
                ご飯の呼び出しは1日1000回までとなっております。
              </p>
            </div>

            {/* カウンター部分 */}
            <div className="text-center space-y-4">
              <div className="text-3xl font-bold text-[#8B4513]">
                {count}回目の呼び出し
              </div>
              
              {lastCallTime && (
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>最終呼び出し: {lastCallTime.toLocaleTimeString()}</span>
                </div>
              )}

              <Button
                onClick={handleCall}
                disabled={count >= 1000}
                className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white py-6 text-xl disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
              >
                ごはんを呼ぶ
              </Button>
            </div>

            {/* プログレスバー */}
            <div className="mt-6">
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#8B4513] h-full transition-all duration-300"
                  style={{ width: `${(count / 1000) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-right text-sm text-gray-600">
                残り {1000 - count} 回
              </div>
            </div>

            {/* 完了メッセージ */}
            {count >= 1000 && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-800">
                本日の呼び出し回数が上限に達しました。
              </div>
            )}
          </div>
        </Card>

        {/* メニュー情報 */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#8B4513] mb-4">営業案内</h2>
          <div className="space-y-2 text-gray-700">
            <p>• テイクアウトも承っております</p>
            <p>• 店内でのお食事は時間制限なしでごゆっくりどうぞ</p>
            <p>• 食券制となっております</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YayoiGohan;
