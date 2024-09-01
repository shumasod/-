import React, { useState } from 'react';
import { PhoneCall, MessageSquare, HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const IVRSystem = () => {
  const [currentStep, setCurrentStep] = useState('main');
  const [history, setHistory] = useState([]);

  const handleOptionClick = (option) => {
    setHistory([...history, currentStep]);
    setCurrentStep(option);
  };

  const handleBack = () => {
    const newHistory = [...history];
    const previousStep = newHistory.pop();
    setHistory(newHistory);
    setCurrentStep(previousStep);
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <Button
        key={option.value}
        className="w-full mb-2 justify-between"
        onClick={() => handleOptionClick(option.value)}
      >
        {option.label}
        <ChevronRight className="ml-2" size={18} />
      </Button>
    ));
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'main':
        return renderOptions([
          { label: '電話でのお問い合わせ', value: 'phone' },
          { label: 'チャットでのお問い合わせ', value: 'chat' },
          { label: 'よくある質問', value: 'faq' },
        ]);
      case 'phone':
        return (
          <div>
            <p className="mb-4">お電話でのお問い合わせは以下の番号までご連絡ください：</p>
            <p className="text-xl font-bold">0120-123-456</p>
          </div>
        );
      case 'chat':
        return (
          <div>
            <p className="mb-4">チャットでのお問い合わせを開始します。</p>
            <Button>チャットを開始</Button>
          </div>
        );
      case 'faq':
        return renderOptions([
          { label: '商品について', value: 'product-faq' },
          { label: '配送について', value: 'shipping-faq' },
          { label: '返品・交換について', value: 'return-faq' },
        ]);
      default:
        return <p>選択されたオプションの情報をここに表示します。</p>;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center font-bold text-xl">
        IVRシステム
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
      <CardFooter className="justify-between">
        {history.length > 0 && (
          <Button variant="outline" onClick={handleBack}>
            戻る
          </Button>
        )}
        <Button variant="outline" onClick={() => setCurrentStep('main')}>
          メインメニューに戻る
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IVRSystem;
