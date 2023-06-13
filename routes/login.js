const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.js');


/* GET login listing. */
// ログイン画面表示
router.get('/', loginController.index);
// ログイン認証処理
router.post('/', loginController.isEmpty, loginController.auth);

// router.post('/', (req, res, next) => {

//   // ユーザー認証処理
//   const email = req.body.email;
//   connection.query(
//     'SELECT * FROM users WHERE email = ?',
//     [email],
//     (error, results) => {
//       console.log(error);
//       if (results.length > 0) {
//         if (req.body.password === results[0].password) {
//           req.session.userId = results[0].id;
//           req.session.userName = results[0].name;
//           // 一覧画面へリダイレクト
//           res.redirect('/list');
//         } else {
//           // ログイン画面へリダイレクト
//           res.redirect('/login');
//         }
//       } else {
//         // ログイン画面へリダイレクト
//         res.redirect('/login');
//       }
//     }
//   );
// });

module.exports = router;
