<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ベトナム版フランダースの犬ゲーム</title>
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
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="80" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">🐕</text></svg>');
        }
        #game-container {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border: 5px solid #4CAF50;
        }
        #counter {
            font-size: 48px;
            margin: 20px 0;
            color: #4CAF50;
        }
        #message {
            font-size: 24px;
            color: #FF4500;
            margin-top: 20px;
            font-weight: bold;
        }
        h1 {
            color: #4CAF50;
            text-shadow: 2px 2px #FFD700;
        }
        #friendship-meter {
            width: 100%;
            height: 20px;
            background-color: #FFF5E1;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 20px;
        }
        #friendship-fill {
            width: 0%;
            height: 100%;
            background-color: #4CAF50;
            transition: width 0.3s;
        }
    </style>
</head>
<body>
    <div id="game-container">
        <h1>ベトナム版フランダースの犬</h1>
        <p>キーを押して少年と犬の絆を深めよう！</p>
        <div id="counter">0</div>
        <div id="message"></div>
        <div id="friendship-meter">
            <div id="friendship-fill"></div>
        </div>
    </div>
    <script>
        let count = 0;
        const counterElement = document.getElementById('counter');
        const messageElement = document.getElementById('message');
        const friendshipFill = document.getElementById('friendship-fill');
        const threshold = 50;
        const maxCount = 100;
        document.addEventListener('keydown', function(event) {
            count++;
            counterElement.textContent = count;
            updateFriendshipMeter();
            if (count >= threshold && count < maxCount) {
                showMessage("がんばれ！絆が深まっているよ！");
            } else if (count >= maxCount) {
                showMessage("すばらしい！少年と犬の絆が最高潮に達しました！");
            }
        });
        function showMessage(msg) {
            messageElement.textContent = msg;
        }
        function updateFriendshipMeter() {
            const fillPercentage = (count / maxCount) * 100;
            friendshipFill.style.width = `${fillPercentage}%`;
        }
    </script>
</body>
</html>
