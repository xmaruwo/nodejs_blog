/**
 * loginController
 */

const loginController = {
  async index(req, res, next) {
    console.log('controller login index');
    res.render('login/index');
  },
};

module.exports = loginController;
