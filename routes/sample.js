var express = require('express');
var router = express.Router();

/* GET sample listing. */
router.get('/', function(req, res, next) {
  res.render('sample/index', { title: 'Sample' });
});

module.exports = router;
