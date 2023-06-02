var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', (req, res, next) => {
  res.render('login/index.ejs', { title: 'Login' });
});

router.post('/', (req, res, next) => {
  // ユーザー認証処理
  // 一覧画面へリダイレクト
  res.redirect('/list');
});

module.exports = router;
