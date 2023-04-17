require('dotenv').config()
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("/ へアクセスがありました");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

