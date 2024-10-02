<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ぺちぺち叩きんしゃんな！</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');
        body {
            font-family: 'Kosugi Maru', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #FFF5E1;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="80" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">🍜</text></svg>');
        }
        #game-container {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border: 5px solid #FF9900;
        }
        #counter {
            font-size: 48px;
            margin: 20px 0;
            color: #FF6600;
        }
        #message {
            font-size: 24px;
            color: #FF0000;
            margin-top: 20px;
            font-weight: bold;
        }
        h1 {
            color: #FF6600;
            text-shadow: 2px 2px #FFD700;
        }
        #tonkotsu-meter {
            width: 100%;
            height: 20px;
            background-color: #FFF5E1;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 20px;
        }
        #tonkotsu-fill {
            width: 0%;
            height: 100%;
            background-color: #FF9900;
            transition: width 0.3s;
        }
    </style>
</head>
<body>
    <div id="game-container">
        <h1>ぺちぺち叩きんしゃんな！</h1>
        <p>キーボードば連打してみんしゃい</p>
        <div id="counter">0</div>
        <div id="message"></div>
        <div id="tonkotsu-meter">
            <div id="tonkotsu-fill"></div>
        </div>
    </div>
    <script>
        let count = 0;
        const counterElement = document.getElementById('counter');
        const messageElement = document.getElementById('message');
        const tonkotsuFill = document.getElementById('tonkotsu-fill');
        const threshold = 50; // メッセージを表示するしきい値
        const maxCount = 100; // 最大カウント

        document.addEventListener('keydown', function(event) {
            count++;
            counterElement.textContent = count;
            updateTonkotsuMeter();

            if (count >= threshold && count < maxCount) {
                showMessage("ぺちぺち叩きんしゃんな！もう！");
            } else if (count >= maxCount) {
                showMessage("んがぁ～！トンコツラーメンのごたる熱かね！");
            }
        });

        function showMessage(msg) {
            messageElement.textContent = msg;
        }

        function updateTonkotsuMeter() {
            const fillPercentage = (count / maxCount) * 100;
            tonkotsuFill.style.width = `${fillPercentage}%`;
        }
    </script>
</body>
</html>
