<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ごはんですよ！</title>
    
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">ロゴ</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">ホーム</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">会社概要</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">サービス</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">お問い合わせ</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <div id="app">
            <gohan-ok></gohan-ok>
        </div>
    </div>

    <footer class="footer bg-light py-4">
        <div class="container text-center">
            &copy; 2024 ごはんですよ！ All Rights Reserved.
        </div>
    </footer>

    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
