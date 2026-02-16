const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// SQLite データベースのセットアップ
const db = new sqlite3.Database(':memory:');

// 簡単なデータベースとテーブルの作成
db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      age INTEGER
    )
  `);
  db.run("INSERT INTO users (id, name, email, age) VALUES (1, 'Alice', 'alice@example.com', 30)");
  db.run("INSERT INTO users (id, name, email, age) VALUES (2, 'Bob', 'bob@example.com', 24)");
  db.run("INSERT INTO users (id, name, email, age) VALUES (3, 'Charlie', 'charlie@example.com', 28)");
});

// ミドルウェア
app.use(bodyParser.json());
app.use(express.static('public'));

// クエリを受け取って実行するエンドポイント
app.post('/query', (req, res) => {
  const query = req.body.query;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
