import React, { useState, useCallback, useEffect } from 'react';
import { PhoneCall, MessageSquare, HelpCircle, ChevronRight, ArrowLeft, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const IVRSystem = () => {
  const [currentStep, setCurrentStep] = useState('main');
  const [history, setHistory] = useState([]);
  const [alert, setAlert] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const initializeCCP = async () => {
      // Amazon Connect Streams APIの初期化
      const connectUrl = "https://your-connect-instance.awsapps.com/connect/ccp-v2/";
      connect.core.initCCP(document.getElementById("ccp-container"), {
        ccpUrl: connectUrl,
        loginPopup: true,
        softphone: {
          allowFramedSoftphone: true
        }
      });

      // コンタクトイベントのリスナーを設定
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
      });
    };

    initializeCCP();
  }, []);

  const handleOptionClick = useCallback((option) => {
    setHistory((prevHistory) => [...prevHistory, currentStep]);
    setCurrentStep(option);
    setAlert(null);
  }, [currentStep]);

  const handleBack = useCallback(() => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const previousStep = newHistory.pop();
      setCurrentStep(previousStep);
      return newHistory;
    });
    setAlert(null);
  }, []);

  const handleMainMenu = useCallback(() => {
    setCurrentStep('main');
    setHistory([]);
    setAlert(null);
  }, []);

  const renderIcon = (iconName) => {
    const icons = {
      PhoneCall: PhoneCall,
      MessageSquare: MessageSquare,
      HelpCircle: HelpCircle,
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="mr-2" size={18} /> : null;
  };

  const renderOptions = useCallback((options) => {
    return options.map((option) => (
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
  }, [handleOptionClick]);

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
      return renderOptions(options[currentStep]);
    }

    switch (currentStep) {
      case 'phone':
        return (
          <div>
            <p className="mb-4">お電話でのお問い合わせは以下の番号までご連絡ください：</p>
            <p className="text-xl font-bold">0120-123-456</p>
            <Button className="mt-4" onClick={() => setAlert({ title: '通話を開始', description: '通話を開始します。しばらくお待ちください。' })}>
              通話を開始
            </Button>
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
      default:
        return <p>選択されたオプションの情報をここに表示します。</p>;
    }
  }, [currentStep, renderOptions]);

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
