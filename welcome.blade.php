<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ごはんよ！</title>
</head>
<body>
  <h1>ごはんよ！</h1>
  <script>
    // 1から1000までの数字を生成
    const numbers = Array.from(Array(1000).keys(), n => n + 1);

    // 数字ごとに「ごはんよ！」を表示
    numbers.forEach(number => {
      document.write(`<h1>ごはんよ！</h1>`);
    });
  </script>
</body>
</html>
