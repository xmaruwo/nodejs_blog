/**
 * articleController
 */
const models = require('../models');
const atricle = models.atricle;

const articleController = {
  async index(req, res) {
    res.render('articles/index', { title: '一覧'})
  },

  // 新規登録画面
  async new(req, res) {
    res.render('articles/new.ejs', {
      title: '新規登録',
      errors: [],
    })
  },

};

module.exports = articleController;
