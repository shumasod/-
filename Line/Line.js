import json
import os
import logging
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import (
    MessageEvent,
    TextMessage,
    TextSendMessage,
)

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# 環境変数から認証情報を取得
LINE_CHANNEL_ACCESS_TOKEN = os.environ['LINE_CHANNEL_ACCESS_TOKEN']
LINE_CHANNEL_SECRET = os.environ['LINE_CHANNEL_SECRET']

line_bot_api = LineBotApi(LINE_CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(LINE_CHANNEL_SECRET)

def lambda_handler(event, context):
    # シグネチャの検証
    signature = event['headers'].get('X-Line-Signature', '')
    body = event['body']
    
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid signature')
        }
    
    return {
        'statusCode': 200,
        'body': json.dumps('OK')
    }

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    # 受信したメッセージ
    message_text = event.message.text
    
    # 応答メッセージの作成
    response = create_response(message_text)
    
    # メッセージ送信
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=response)
    )

def create_response(message):
    """
    メッセージに応じた応答を作成する関数
    実際のユースケースに応じてカスタマイズしてください
    """
    if '挨拶' in message:
        return 'こんにちは！'
    elif '天気' in message:
        return '今日は晴れです！'
    else:
        return 'すみません、よく分かりませんでした。'
