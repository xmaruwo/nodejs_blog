const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController.js')

/* GET sample listing. */
router.get('/', articleController.index)

/* GET articles new listing */
router.get('/new', articleController.new)

module.exports = router;
