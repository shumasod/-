import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PhoneCall, MessageSquare, HelpCircle, ChevronRight, ArrowLeft, Home, User, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const IVRSystem = () => {
  const [currentStep, setCurrentStep] = useState('main');
  const [history, setHistory] = useState([]);
  const [alert, setAlert] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    const initializeCCP = async () => {
      const connectUrl = "https://your-connect-instance.awsapps.com/connect/ccp-v2/";
      connect.core.initCCP(document.getElementById("ccp-container"), {
        ccpUrl: connectUrl,
        loginPopup: true,
        softphone: {
          allowFramedSoftphone: true
        }
      });

      connect.contact((contact) => {
        contact.onConnecting((contact) => {
          const attributes = contact.getAttributes();
          setCustomerInfo({
            name: attributes.customerName?.value || "Unknown",
            phone: contact.getInitialConnection().getAddress().phoneNumber,
            accountStatus: attributes.accountStatus?.value || "Unknown",
            lastPurchase: attributes.lastPurchase?.value || "N/A"
          });
        });

        contact.onConnected(() => {
          setIsCallActive(true);
          startTimer();
        });

        contact.onEnded(() => {
          setIsCallActive(false);
          stopTimer();
          setAlert({
            title: "通話終了",
            description: `通話時間: ${formatDuration(callDuration)}`,
          });
        });
      });

      connect.agent((agent) => {
        agent.onMuteToggle((isMuted) => {
          setIsMuted(isMuted);
        });
      });
    };

    initializeCCP();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = useCallback((option) => {
    setHistory((prevHistory) => [...prevHistory, currentStep]);
    setCurrentStep(option);
    setAlert(null);
    setSearchQuery('');
  }, [currentStep]);

  const handleBack = useCallback(() => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const previousStep = newHistory.pop();
      setCurrentStep(previousStep);
      return newHistory;
    });
    setAlert(null);
    setSearchQuery('');
  }, []);

  const handleMainMenu = useCallback(() => {
    setCurrentStep('main');
    setHistory([]);
    setAlert(null);
    setSearchQuery('');
  }, []);

  const handleMuteToggle = useCallback(() => {
    const newMuteState = !isMuted;
    connect.agent((agent) => {
      agent.mute(newMuteState);
    });
    setIsMuted(newMuteState);
  }, [isMuted]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const renderIcon = (iconName) => {
    const icons = {
      PhoneCall,
      MessageSquare,
      HelpCircle,
      Volume2,
      VolumeX,
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="mr-2" size={18} /> : null;
  };

  const renderOptions = useCallback((options) => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredOptions.map((option) => (
      <Button
        key={option.value}
        className="w-full mb-2 justify-between"
        onClick={() => handleOptionClick(option.value)}
      >
        <span className="flex items-center">
          {renderIcon(option.icon)}
          {option.label}
        </span>
        <ChevronRight size={18} />
      </Button>
    ));
  }, [handleOptionClick, searchQuery]);

  const renderCustomerInfo = () => {
    if (!customerInfo) return null;

    return (
      <Card className="mb-4">
        <CardHeader className="flex items-center">
          <User className="mr-2" size={18} />
          <h3 className="font-bold">顧客情報</h3>
        </CardHeader>
        <CardContent>
          <p><strong>名前:</strong> {customerInfo.name}</p>
          <p><strong>電話番号:</strong> {customerInfo.phone}</p>
          <p><strong>アカウント状態:</strong> {customerInfo.accountStatus}</p>
          <p><strong>最終購入:</strong> {customerInfo.lastPurchase}</p>
        </CardContent>
      </Card>
    );
  };

  const renderContent = useCallback(() => {
    const options = {
      main: [
        { icon: 'PhoneCall', label: '電話でのお問い合わせ', value: 'phone' },
        { icon: 'MessageSquare', label: 'チャットでのお問い合わせ', value: 'chat' },
        { icon: 'HelpCircle', label: 'よくある質問', value: 'faq' },
      ],
      faq: [
        { icon: 'HelpCircle', label: '商品について', value: 'product-faq' },
        { icon: 'HelpCircle', label: '配送について', value: 'shipping-faq' },
        { icon: 'HelpCircle', label: '返品・交換について', value: 'return-faq' },
      ],
    };

    if (options[currentStep]) {
      return (
        <>
          <div className="mb-4">
            <Label htmlFor="search">検索</Label>
            <Input
              id="search"
              type="text"
              placeholder="オプションを検索..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {renderOptions(options[currentStep])}
        </>
      );
    }

    switch (currentStep) {
      case 'phone':
        return (
          <div>
            <p className="mb-4">お電話でのお問い合わせは以下の番号までご連絡ください：</p>
            <p className="text-xl font-bold">0120-123-456</p>
            <Button
              className="mt-4"
              onClick={() => setAlert({ title: '通話を開始', description: '通話を開始します。しばらくお待ちください。' })}
              disabled={isCallActive}
            >
              {isCallActive ? '通話中' : '通話を開始'}
            </Button>
            {isCallActive && (
              <div className="mt-4">
                <p>通話時間: {formatDuration(callDuration)}</p>
                <Button className="mt-2" onClick={handleMuteToggle}>
                  {isMuted ? <VolumeX className="mr-2" size={18} /> : <Volume2 className="mr-2" size={18} />}
                  {isMuted ? 'ミュート解除' : 'ミュート'}
                </Button>
              </div>
            )}
          </div>
        );
      case 'chat':
        return (
          <div>
            <p className="mb-4">チャットでのお問い合わせを開始します。</p>
            <Button onClick={() => setAlert({ title: 'チャットを開始', description: 'チャットウィンドウが開きます。しばらくお待ちください。' })}>
              チャットを開始
            </Button>
          </div>
        );
      case 'product-faq':
        return (
          <div>
            <h3 className="font-bold mb-2">商品についてのよくある質問</h3>
            <ul className="list-disc pl-5">
              <li>商品の保証期間はどのくらいですか？</li>
              <li>商品のサイズや色の交換は可能ですか？</li>
              <li>商品の使い方がわからない場合はどうすればいいですか？</li>
            </ul>
          </div>
        );
      case 'shipping-faq':
        return (
          <div>
            <h3 className="font-bold mb-2">配送についてのよくある質問</h3>
            <ul className="list-disc pl-5">
              <li>配送にはどのくらいの日数がかかりますか？</li>
              <li>配送状況の確認方法を教えてください。</li>
              <li>海外への配送は可能ですか？</li>
            </ul>
          </div>
        );
      case 'return-faq':
        return (
          <div>
            <h3 className="font-bold mb-2">返品・交換についてのよくある質問</h3>
            <ul className="list-disc pl-5">
              <li>返品・交換の期限はありますか？</li>
              <li>返品・交換の手続き方法を教えてください。</li>
              <li>返品・交換にかかる送料は誰が負担しますか？</li>
            </ul>
          </div>
        );
      default:
        return <p>選択されたオプションの情報をここに表示します。</p>;
    }
  }, [currentStep, renderOptions, searchQuery, isCallActive, callDuration, isMuted, handleMuteToggle]);

  return (
    <div className="flex">
      <div id="ccp-container" style={{ width: '320px', height: '465px' }}></div>
      <Card className="w-full max-w-md mx-auto ml-4">
        <CardHeader className="text-center font-bold text-xl flex items-center justify-center">
          <PhoneCall className="mr-2" size={24} />
          IVRシステム
        </CardHeader>
        <CardContent>
          {renderCustomerInfo()}
          {alert && (
            <Alert className="mb-4">
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          )}
          {renderContent()}
        </CardContent>
        <CardFooter className="justify-between">
          {history.length > 0 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2" size={18} />
              戻る
            </Button>
          )}
          <Button variant="outline" onClick={handleMainMenu}>
            <Home className="mr-2" size={18} />
            メインメニュー
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IVRSystem;
