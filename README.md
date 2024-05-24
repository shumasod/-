# ごはんですよとメッセージを表示するサイトを作成

#### php8.2
##### composerやartisanは必要


#### Laravel_Sail環境を構築
#### dockerDeskTopを使用


## 1,プロジェクトの作成


composer create-project laravel/laravel gohan-ok


## 2,依存関係のインストール
次に、Node.jsの依存関係をインストールします。

npm install

## 3. ルートの設定
次に、ルートの（web.php)設定を行います。

Route::get('/', function () {
    return view('welcome');
});

## 4. ビューの作成
次に、ビューを作成します。

resources/views/welcome.blade.php
<html>
<head>
    <title>ごはんですよ！</title>
</head>
<body>
    <h1>ごはんですよ！</h1>
</body>
ここらへんの部分のフォームはboottrapを使用して実装していく予定

    
## 5. bladeの作成(別案を検討中）
次に、bladeをベースにフロントを作成していく。

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

// 18時になると、ごはんですよ！とアラートを表示する
setInterval(() => {
    if (new Date().getHours() === 18) {
        app.$refs.gohanOk.sayGohanOk();
    }
}, 1000);****


## 6. TailwindCSSの設定

### resources/css/app.css
@import "~tailwindcss/dist/tailwind.css";

## 7. 実行
最後に、アプリケーションを実行します。

php artisan serve

npm run dev

#### マイグレーションファイルの実行はどこかのタイミングで行う
