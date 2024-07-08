<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ぺちぺち叩かないで</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        #game-container {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        #counter {
            font-size: 48px;
            margin: 20px 0;
        }
        #message {
            font-size: 24px;
            color: red;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div id="game-container">
        <h1>ぺちぺち叩かないで</h1>
        <p>キーボードを連打してみてください</p>
        <div id="counter">0</div>
        <div id="message"></div>
    </div>

    <script>
        let count = 0;
        const counterElement = document.getElementById('counter');
        const messageElement = document.getElementById('message');
        const threshold = 50; // メッセージを表示するしきい値

        document.addEventListener('keydown', function(event) {
            count++;
            counterElement.textContent = count;

            if (count >= threshold) {
                showMessage();
            }
        });

        function showMessage() {
            messageElement.textContent = "ぺちぺち叩かないで！";
        }
    </script>
</body>
</html>
