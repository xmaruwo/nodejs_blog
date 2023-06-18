const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController.js')
const authController = require('../controllers/authController.js');

/* GET sample listing. */
router.get('/', articleController.index)

/* GET articles new listing */
router.get('/new', authController.isAuthenticated, articleController.new)

/* POST articles confirm */
router.post('/confirm', authController.isAuthenticated, articleController.isEmpty, articleController.isConfirm)

/* POST articles create */
router.post('/create', authController.isAuthenticated, articleController.isCreate)

/* GET users complate */
router.get('/complete', authController.isAuthenticated, articleController.complete)

module.exports = router;
