/**
 * authController
 */
const redirectLoginPath = '/login';

const authController = {
  async isAuthenticated(req, res, next) {
    if (req.session.userId) {
      return next();
    } else {
      return res.redirect(redirectLoginPath);
    }
  }
};

module.exports = authController;
