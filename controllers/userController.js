/**
 * userController
 */
const models = require('../models');
const user = models.user;
const bcrypt = require('bcrypt');

const redirectCompletePath = '/users/complete';
const redirectListPath = '/lists';

const userController = {
  async index(req, res) {
    console.log('controller user index');
    res.send('respond with a resource');
  },

  async new(req, res) {
    res.render('users/new.ejs', {
      title: '新規登録',
      errors: [],
    })
  },

  // create
  async isEmpty(req, res, next) {
    console.log('userController::create:: 入力値チェック');
    const name = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const errors = [];

    if (name === '') {
      errors.push('ユーザー名を入力して下さい');
    }
    if (email === '') {
      errors.push('メールアドレスを入力して下さい');
    }
    if (password === '') {
      errors.push('パスワードを入力して下さい');
    }

    console.log(errors);
    if (errors.length > 0) {
      res.render('users/new.ejs', {
        title: '新規登録',
        errors: errors,
      })
    } else {
      next();
    }
  },
  async isValid(req, res, next) {
    console.log('重複チェック');
    const errors = [];
    const email = req.body.userEmail;

    const results = await user.findAll({
      where: models.sequelize.where(models.sequelize.col('email'), email)
    });

    // メールアドレス登録チェック
    if (results.length > 0) {
      errors.push('既に登録されています');
    }

    if (errors.length > 0) {
      console.log(errors);
      res.render('users/new.ejs', {
        title: '新規登録',
        errors: errors,
      })
    } else {
      next();
    }
  },
  async isCreate(req, res) {
    const name = req.body.userName;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const hash_password = bcrypt.hashSync(password, 10);
    const errors = [];
    let results = [];

    const userData = {
      name: name,
      email: email,
      password: hash_password,
    }
    results = await user.create(userData);

    console.log(results);
    res.redirect(redirectCompletePath);
  },
  async complete(req, res) {
    res.render('users/complete.ejs')
  }

};

module.exports = userController;
