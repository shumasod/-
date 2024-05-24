ここに読みやすく編集したReadmeを示します。

# ごはんですよとメッセージを表示するサイトを作成

## 環境

- PHP 8.2
- Laravel 9.x
- Laravel Sail (Docker を使用)

### 前提条件

- Composer がインストールされている
- Artisan コマンドが使用可能

## 手順

### 1. プロジェクトの作成

```
composer create-project laravel/laravel gohan-ok
```

### 2. 依存関係のインストール

Node.js の依存関係をインストールします。

```
npm install
```

### 3. ルートの設定

`routes/web.php` ファイルを編集し、ルートを設定します。

```php
Route::get('/', function () {
    return view('welcome');
});
```

### 4. ビューの作成

`resources/views/welcome.blade.php` ファイルを作成し、以下の内容を記述します。

```html
<html>
<head>
    <title>ごはんですよ！</title>
</head>
<body>
    <h1>ごはんですよ！</h1>
</body>
</html>
```

（注: フォームの実装はBootstrapを使用する予定）

### 5. Bladeの作成

`resources/views/components/gohan-ok.blade.php` ファイルを作成し、以下の内容を記述します。

```html
<script>
import Vue from 'vue'
import { Library } from '@fortawesome/fontawesome-svg-core'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Library.add(faUtensils)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('gohan-ok', {
  template: `
    <div>
      <h1>{{ showGohanText ? '🍱ごはんですよ' : '' }}</h1>
      <div :style="{ fontSize: '5rem', fontFamily: 'cursive' }">{{ showGohanText ? '🍱ごはんですよ' : '' }}</div>
    </div>
  `,
  data() {
    return {
      showGohanText: false
    }
  },
  mounted() {
    this.checkTime()
    setInterval(this.checkTime, 60000) // 1分ごとに時間をチェック
  },
  methods: {
    checkTime() {
      const now = new Date()
      const hour = now.getHours()
      const minute = now.getMinutes()

      if (hour === 18 && minute === 0) {
        this.showGohanText = true
        alert('ごはんですよ!')
      } else {
        this.showGohanText = false
      }
    }
  }
})
</script>
```

（注: 18時になると、「ごはんですよ！」とアラートを表示する）

### 6. TailwindCSSの設定

`resources/css/app.css` ファイルを編集し、以下の内容を記述します。

```css
@import "~tailwindcss/dist/tailwind.css";
```

### 7. 実行

最後に、アプリケーションを実行します。

```
php artisan serve
npm run dev
```

（注: マイグレーションファイルの実行が必要な場合は、適切なタイミングで実行してください）

このReadmeでは、Laravel 9.xとLaravel Sailを使用して、18時になると「ごはんですよ！」というメッセージを表示するサイトを作成する手順を説明しています。プロジェクトの作成、ルート設定、ビューの作成、Bladeコンポーネントの作成、TailwindCSSの設定、アプリケーションの実行までの流れが記載されています。
