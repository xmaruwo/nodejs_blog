const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const articleController = require('../controllers/articleController.js');

/* GET articles new listing */
router.get('/new', authController.isAuthenticated, articleController.new)

/* POST articles confirm */
router.post('/confirm', authController.isAuthenticated, articleController.isEmpty, articleController.isConfirm)

/* POST articles create */
router.post('/create', authController.isAuthenticated, articleController.isCreate)

/* GET articles complate */
router.get('/complete/:type', authController.isAuthenticated, articleController.complete)

/* GET articles show */
router.get('/show/:id', articleController.show)

/* GET articles edit */
router.get('/:user_id/edit/:id', authController.isAuthenticated, articleController.edit)

/* POST articles edit confirm */
router.post('/:user_id/confirm/:id', authController.isAuthenticated, articleController.isEmpty, articleController.isConfirm)

/* POST articles edit update */
router.post('/:user_id/update/:id', authController.isAuthenticated, articleController.update)

/* GET articles edit delete */
router.get('/:user_id/delete/:id', authController.isAuthenticated, articleController.delete)

/* GET articles　index :: ユーザー記事一覧 */
router.get('/:user_id', authController.isAuthenticated, articleController.index)


module.exports = router;
