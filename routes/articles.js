const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController.js')
const authController = require('../controllers/authController.js');

/* GET articles　index :: ユーザー記事一覧 */
router.get('/:user_id', authController.isAuthenticated, articleController.index)

/* GET articles new listing */
router.get('/new', authController.isAuthenticated, articleController.new)

/* POST articles confirm */
router.post('/confirm', authController.isAuthenticated, articleController.isEmpty, articleController.isConfirm)

/* POST articles create */
router.post('/create', authController.isAuthenticated, articleController.isCreate)

/* GET articles complate */
router.get('/complete', authController.isAuthenticated, articleController.complete)

/* GET articles show */
router.get('/show/:id', articleController.show)

module.exports = router;
