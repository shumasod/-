LaravelでPassportを使用してAPI認証を実装するための手順とソースコードを以下にまとめます。

1. **Passportのインストール**：
   ```bash
   composer require laravel/passport
   ```

2. **Passportのセットアップ**：
   ```bash
   php artisan passport:install
   ```

3. **ユーザーモデルにPassportのトレイトを追加**：
   `App\Models\User` ファイルを以下のように修正します。

   ```php
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
   ```

4. **ルーティングの設定**：
   `routes/api.php` ファイルに以下を追加します。

   ```php
   use Laravel\Passport\Passport;

   Passport::routes();
   ```

5. **認証ミドルウェアを追加**：
   認証が必要なAPIルートに、Passportの `auth:api` ミドルウェアを追加します。

   ```php
   use Illuminate\Http\Request;
   use Illuminate\Support\Facades\Route;

   Route::middleware('auth:api')->get('/user', function (Request $request) {
       return $request->user();
   });
   ```

6. **アクセストークンの取得**：
   アクセストークンを取得するために、`/oauth/token` エンドポイントに対してクライアントの資格情報とユーザーの資格情報を提供してPOSTリクエストを行います。

これで、LaravelアプリケーションにAPI認証が実装されました。ユーザーはアクセストークンを使用してAPIにアクセスできます。
