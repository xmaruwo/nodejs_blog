/**
 * loginController
 */

const loginController = {
  async index(req, res) {
    console.log('controller login index');
    res.render('login/index');
  },
};

module.exports = loginController;
