const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')

/* GET users listing. */
router.get('/', userController.index);

/* GET users new listing. */
router.get('/new', userController.new);

/* POST user create */
router.post('/create', userController.isEmpty, userController.isValid, userController.isCreate);

/* GET users complate */
router.get('/complete', userController.complete)

module.exports = router;
