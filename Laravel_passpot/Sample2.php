LaravelでAPI認証を実装する方法はいくつかありますが、最も一般的な方法はLaravel Passportを使用することです。PassportはOAuth2およびJWT(JSON Web Token)をサポートしており、簡単にAPI認証を設定できます。

以下は、Laravel Passportを使用してAPI認証を実装する手順です：

Passportのインストール：

composer require laravel/passport
Passportのセットアップ：


php artisan passport:install
ユーザーモデルにPassportのトレイトを追加：
ユーザーモデル (App\Models\User) で Laravel\Passport\HasApiTokens トレイトを使用します。

<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    // ユーザーモデルのその他のコード
}
ルーティングの設定：
Passportのルートを追加するため、Auth::routes() の代わりに Passport::routes() を使用します。routes/api.php ファイルに以下のように追加します。


use Laravel\Passport\Passport;

Passport::routes();
認証ミドルウェアを追加：
認証が必要なAPIルートに、Passportの auth:api ミドルウェアを追加します。

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
アクセストークンの取得：
アクセストークンを取得するために、/oauth/token エンドポイントに対して、クライアントの資格情報とユーザーの資格情報を提供してPOSTリクエストを行います。

これで、LaravelアプリケーションにAPI認証が実装されました。ユーザーはアクセストークンを使用してAPIにアクセスできます。


