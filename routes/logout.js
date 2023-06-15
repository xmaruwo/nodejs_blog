const express = require('express');
//const session = require('express-session');
const router = express.Router();

const redirectListPath = '/lists';


/* GET logout listing. */
router.get('/', (req, res, next) => {
  req.session.destroy((error) => {
    console.error(error);
    res.redirect(redirectListPath);
  });
});

module.exports = router;
