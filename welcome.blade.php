<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>ごはんよ！</title>
  <!-- Bootstrap CSS CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">
  <div class="container mt-5">
    <h1 class="text-center mb-4">ごはんよ！</h1>
    <div class="row">
      <div class="col-12">
        <script>
          // 1から1000までの数字を生成
          const numbers = Array.from(Array(1000).keys(), n => n + 1);

          // 数字ごとに「ごはんよ！」を表示
          numbers.forEach(number => {
            document.write(`<h1 class="text-center mb-3">ごはんよ！</h1>`);
          });
        </script>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS and Popper.js CDN (必要に応じて) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
