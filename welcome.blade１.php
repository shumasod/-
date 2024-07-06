<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>EXTREME MUSCLE</title>
    
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        body {
            font-family: 'Impact', sans-serif;
            background-color: #1a1a1a;
            color: #ffffff;
        }
        .navbar {
            background-color: #ff4500 !important;
        }
        .navbar-brand {
            font-size: 2rem;
            font-weight: bold;
            color: #ffffff !important;
            text-shadow: 2px 2px #000000;
        }
        .nav-link {
            color: #ffffff !important;
            font-size: 1.2rem;
            text-transform: uppercase;
        }
        .hero-section {
            background-image: url('/api/placeholder/1200/600');
            background-size: cover;
            background-position: center;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .hero-section::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        .hero-content {
            z-index: 1;
            text-align: center;
        }
        .hero-content h1 {
            font-size: 5rem;
            text-transform: uppercase;
            margin-bottom: 1rem;
            text-shadow: 3px 3px #ff4500;
        }
        .hero-content p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
        }
        .btn-custom {
            background-color: #ff4500;
            color: #ffffff;
            border: none;
            padding: 15px 30px;
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
        }
        .btn-custom:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 69, 0, 0.8);
        }
        .feature-section {
            padding: 4rem 0;
            background-color: #2a2a2a;
        }
        .feature-item {
            text-align: center;
            margin-bottom: 2rem;
        }
        .feature-item i {
            font-size: 3rem;
            color: #ff4500;
            margin-bottom: 1rem;
        }
        .feature-item h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="#">EXTREME MUSCLE</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">ホーム</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">トレーニング</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">栄養指導</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">成功事例</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="hero-section">
        <div class="hero-content">
            <h1>BECOME UNSTOPPABLE</h1>
            <p>限界を超えろ。最強の自分を作り上げろ。</p>
            <button class="btn btn-custom">今すぐ参加</button>
        </div>
    </div>
    <div class="feature-section">
        <div class="container">
            <div class="row">
                <div class="col-md-4 feature-item">
                    <i class="fas fa-dumbbell"></i>
                    <h3>極限のトレーニング</h3>
                    <p>プロが監修した究極のワークアウトプログラム</p>
                </div>
                <div class="col-md-4 feature-item">
                    <i class="fas fa-utensils"></i>
                    <h3>完璧な栄養管理</h3>
                    <p>マッスルビルディングに特化した食事プラン</p>
                </div>
                <div class="col-md-4 feature-item">
                    <i class="fas fa-users"></i>
                    <h3>最強のコミュニティ</h3>
                    <p>同じ志を持つ仲間たちとの切磋琢磨</p>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer py-4" style="background-color: #1a1a1a; color: #ffffff;">
        <div class="container text-center">
            &copy; 2024 EXTREME MUSCLE. All Rights Reserved.
        </div>
    </footer>
    <script src="{{ mix('js/app.js') }}"></script>
    <script src="https://kit.fontawesome.com/your-fontawesome-kit.js" crossorigin="anonymous"></script>
</body>
</html>
