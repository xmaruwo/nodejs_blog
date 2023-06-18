/**
 * loginController
 */
const models = require('../models');
const user = models.user;
const bcrypt = require('bcrypt');
const redirectListPath = '/lists';

const loginController = {
  // ログイン画面表示
  async index(req, res) {
    console.log('controller login index');
    res.render('login/index', {
      title: 'ログイン',
      errors: [],
    });
  },
  // ログイン認証
  async isEmpty(req, res, next) {
    console.log('loginController::isEmpty:: 入力値チェック');
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];

    if (email === '') {
      errors.push('メールアドレスを入力して下さい');
    }
    if (password === '') {
      errors.push('パスワードを入力して下さい');
    }

    console.log(errors);
    if (errors.length > 0) {
      res.render('login/index', {
        title: 'ログイン',
        errors: errors,
      })
    } else {
      next();
    }
  },
  async auth(req, res) {
    console.log('loginController::auth');
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];

    const result = await user.findOne({
      attributes: [
        'id',
        'name',
        'email',
        'password',
      ],
      where: models.sequelize.where(models.sequelize.col('email'), email)
    });

    if (result === null) {
      errors.push('ユーザーが見つかりませんでした');
      res.render('login/index', {
        title: 'ログイン',
        errors: errors,
      });
    } else {
      const comparedPassword = bcrypt.compareSync(password, result.password);
      console.log('compared: ' + comparedPassword);

      // パスワード照合
      if (comparedPassword) {
        // セッション情報設定
        req.session.userId = result.id;
        req.session.userName = result.name;

        res.redirect(redirectListPath);
      } else {
        errors.push('ログインに失敗しました');
        res.render('login/index', {
          title: 'ログイン',
          errors: errors,
        });
      }
    }
  },
};

module.exports = loginController;
