const express = require('express');
//const session = require('express-session');
const router = express.Router();

/* GET logout listing. */
router.get('/', (req, res, next) => {
  req.session.destroy((error) => {
    console.error(error);
    res.render('lists/index', { title: '一覧' });
  });
});

module.exports = router;
