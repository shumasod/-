const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();

// LINE Bot設定
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

// Webhookの検証用ミドルウェア
app.use('/webhook', line.middleware(config));

// Webhookルートの処理
app.post('/webhook', async (req, res) => {
    try {
        // イベントオブジェクトの配列をループ処理
        const events = req.body.events;
        await Promise.all(events.map(handleEvent));

        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
});

// イベントハンドラー
async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    }

    // メッセージ内容に基づいて応答を生成
    const response = createResponse(event.message.text);

    // 応答メッセージを送信
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: response
    });
}

// 応答メッセージを生成する関数
function createResponse(message) {
    // ここに応答ロジックを実装
    if (message.includes('こんにちは')) {
        return 'こんにちは！何かお手伝いできることはありますか？';
    } else if (message.includes('天気')) {
        return '天気予報の確認ですね。申し訳ありませんが、現在その機能は実装中です。';
    } else if (message.includes('ヘルプ')) {
        return '以下のコマンドが使用できます：\n・こんにちは\n・天気\n・ヘルプ';
    } else {
        return 'すみません、よく分かりませんでした。「ヘルプ」と送信すると、使用可能なコマンドを確認できます。';
    }
}

// サーバーの起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// エラーハンドリング
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
});

module.exports = app;
