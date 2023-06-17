const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

/* GET list listing. */
router.get('/', listController.index);

module.exports = router;
