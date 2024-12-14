import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const GohanYobare = () => {
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

  useEffect(() => {
    let yobikakeInterval;
    if (isActive && count < 1000) {
      yobikakeInterval = setInterval(() => {
        setCount(prev => {
          if (prev < 1000) {
            handleCall();
            return prev + 1;
          }
          return prev;
        });
      }, 3000);
    }
    return () => clearInterval(yobikakeInterval);
  }, [isActive]);

  const handleCall = () => {
    if (count >= 1000) return;
    
    const now = new Date();
    setLastCallTime(now);
    setCount(prev => prev + 1);
    
    // 実際のプロダクションでは音声ファイルのパスを適切に設定する必要があります
    // const audio = new Audio('/path/to/gong.mp3');
    // audio.play();
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl bg-white/90 backdrop-blur-sm border-2 border-amber-800">
        <div className="p-8 space-y-6">
          {/* 和風の装飾的なヘッダー */}
          <div className="relative text-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="border-t-2 border-amber-800/30 w-full"></div>
            </div>
            <span className="relative px-4 bg-white/90 text-3xl font-serif text-amber-900">
              ごはんでございます
            </span>
          </div>

          {/* メインコンテンツ */}
          <div className="text-center space-y-4">
            <div className="text-xl font-medium text-amber-900">
              {count}回目の呼びかけ
            </div>
            
            {lastCallTime && (
              <div className="text-sm text-gray-600">
                最後の呼びかけ: {lastCallTime.toLocaleTimeString()}
              </div>
            )}

            <Button
              onClick={handleCall}
              disabled={count >= 1000}
              className={`
                w-full max-w-md h-14 text-lg
                bg-amber-800 hover:bg-amber-900
                disabled:bg-gray-400 disabled:cursor-not-allowed
                transition-all duration-300
                flex items-center justify-center gap-2
              `}
            >
              <Bell className="w-5 h-5" />
              ごはんを呼ぶ
            </Button>

            {count >= 1000 && (
              <div className="mt-6 p-4 bg-amber-100 rounded-lg text-amber-900 font-medium">
                1000回のごはんの呼びかけが完了いたしました。
              </div>
            )}
          </div>

          {/* 進捗バー */}
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200">
              <div 
                style={{ width: `${(count / 1000) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-800 transition-all duration-300"
              ></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GohanYobare;
