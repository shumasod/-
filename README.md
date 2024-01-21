# ごはんですよとメッセージを表示するサイトを作成するよ

## 1,プロジェクトの作成

まず、Laravelプロジェクトを作成します。

composer create-project laravel/laravel gohan-ok


## 2,依存関係のインストール
次に、Node.jsの依存関係をインストールします。

npm install

## 3. ルートの設定
次に、ルートの設定を行います。

Route::get('/', function () {
    return view('welcome');
});
