Passportのインストール：
まず、PassportパッケージをComposerを使ってインストールします。



composer require laravel/passport
Passportのセットアップ：
Passportを初期化し、必要なデータベーステーブルを作成します。


php artisan passport:install
UserモデルにHasApiTokensトレイトを追加：
App\Models\User モデルに Laravel\Passport\HasApiTokens トレイトを追加します。


<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    // その他のモデルコード
}
Passportのルートを設定：
Auth::routes() の代わりに、Passportのルートを設定します。


use Laravel\Passport\Passport;

Passport::routes();
Passportの設定：
Passportの設定を config/auth.php で行います。api ガードのドライバーを passport に変更します。



'guards' => [
    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
マイグレーション実行：
Passportのマイグレーションを実行して、認証用のテーブルをデータベースに追加します。


php artisan migrate
認証を必要とするルートを定義：
認証が必要なAPIルートに、auth:api ミドルウェアを使用します。

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
以上で、Laravel Passportを使用したAPI認証が設定されました。ユーザーはOAuth2を介して認証し、アクセストークンを使用してAPIにアクセスできます。





