const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')

/* GET users listing. */
router.get('/', userController.index);

/* GET users new listing. */
router.get('/new', userController.new);

/* POST user create */
// 空白チェック
router.post('/create', userController.isEmpty);
// 重複チェック
router.post('/create', userController.isValid);
// ユーザー登録
router.post('/create', userController.isCreate);

module.exports = router;
