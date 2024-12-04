# ごはんですよ！アプリケーション開発ガイド

## 環境要件
- PHP 8.3以上
- Laravel 11
- Docker Desktop
- Composer 2.x
- Node.js 20.x以上

## セットアップ手順

### 1. プロジェクトの作成
```bash
curl -s "https://laravel.build/gohan-ok" | bash
cd gohan-ok
```

### 2. アプリケーションの初期設定
```bash
./vendor/bin/sail up -d
./vendor/bin/sail composer install
./vendor/bin/sail npm install
```

### 3. ルートの設定
`routes/web.php` に以下を追加:

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GohanController;

Route::get('/', [GohanController::class, 'index'])->name('gohan.index');
```

### 4. コントローラーの作成
```bash
./vendor/bin/sail artisan make:controller GohanController
```

`app/Http/Controllers/GohanController.php`:
```php
<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class GohanController extends Controller
{
    public function index(): View
    {
        return view('gohan.index');
    }
}
```

### 5. Bladeビューの作成
`resources/views/gohan/index.blade.php`:
```php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ごはんですよ！</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="antialiased">
    <div id="app">
        <gohan-message></gohan-message>
    </div>
</body>
</html>
```

### 6. Vueコンポーネントの作成
`resources/js/components/GohanMessage.vue`:
```vue
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
            <h1 class="text-4xl font-bold mb-4" :class="{ 'animate-bounce': showMessage }">
                {{ message }}
            </h1>
            <div class="text-xl text-gray-600">
                現在時刻: {{ currentTime }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const message = ref('')
const showMessage = ref(false)
const currentTime = ref('')

const checkTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString()
    
    const hour = now.getHours()
    const minute = now.getMinutes()
    
    if (hour === 18 && minute === 0) {
        message.value = '🍱 ごはんですよ！'
        showMessage.value = true
        new Notification('ごはんですよ！', {
            body: '夕食の時間です！',
            icon: '/favicon.ico'
        })
    } else {
        message.value = '🕒 まだごはんの時間ではありません'
        showMessage.value = false
    }
}

onMounted(() => {
    if ('Notification' in window) {
        Notification.requestPermission()
    }
    
    checkTime()
    setInterval(checkTime, 1000)
})
</script>
```

### 7. Vueの設定
`resources/js/app.js`:
```javascript
import './bootstrap';
import { createApp } from 'vue'
import GohanMessage from './components/GohanMessage.vue'

const app = createApp({})
app.component('gohan-message', GohanMessage)
app.mount('#app')
```

### 8. TailwindCSSの設定
`tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            animation: {
                bounce: 'bounce 1s infinite',
            }
        },
    },
    plugins: [],
}
```

### 9. 開発サーバーの起動
```bash
./vendor/bin/sail npm run dev
```

別のターミナルで:
```bash
./vendor/bin/sail up
```

## 主な機能
- 18時になると「ごはんですよ！」というメッセージを表示
- ブラウザ通知機能によるデスクトップ通知
- リアルタイムの時刻表示
- アニメーション効果
- レスポンシブデザイン

## 注意事項
- ブラウザ通知を有効にするには、ユーザーの許可が必要です
- 開発環境では `http://localhost` でアクセスできます
- 本番環境にデプロイする際は、適切なセキュリティ設定を行ってください

## トラブルシューティング
1. コンテナが起動しない場合:
```bash
./vendor/bin/sail down --rmi all -v
./vendor/bin/sail up -d
```

2. Node.jsの依存関係でエラーが発生する場合:
```bash
./vendor/bin/sail npm clean-install
```
