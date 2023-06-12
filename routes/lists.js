var express = require('express');
var router = express.Router();

/* GET list listing. */
router.get('/', (req, res, next) => {
  res.render('lists/index', { title: '一覧' });
});

module.exports = router;
