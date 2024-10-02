
Sanctum（以前はLaravel Airlockとして知られていました）は、SPA（Single Page Application）やモバイルアプリケーション向けの軽量な認証システムです。以下に、Laravel Sanctumを使用してAPI認証を実装する手順を示します：

Sanctumのインストール：
Composerを使用して、Laravel Sanctumパッケージをインストールします。

composer require laravel/sanctum
Sanctumのセットアップ：
Sanctumを初期化し、必要なデータベーステーブルを作成します。

php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
Middlewareの追加：
api ミドルウェアグループに、EnsureFrontendRequestsAreStateful ミドルウェアを追加します。これにより、SPAからのリクエストが認証されるようになります。

app/Http/Kernel.php:

'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
ユーザーモデルの設定：
App\Models\User モデルに HasApiTokens トレイトを追加します。

<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    // その他のモデルコード
}
CORS設定（オプション）：
必要に応じて、CORS（Cross-Origin Resource Sharing）の設定を行います。

認証が必要なルートの定義：
認証が必要なAPIルートに、auth:sanctum ミドルウェアを追加します。


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
以上で、Laravel Sanctumを使用したAPI認証が設定されました。ユーザーはSPAやモバイルアプリから認証し、トークンを使用してAPIにアクセスできます。




