/**
 * listController
 */
const models = require('../models')
const article = models.article;
const user = models.user;

const listController = {
  async index(req, res) {
    console.log('list index::::')

    const results = await article.findAll({ include: user });
    console.log(results)
    res.render('lists/index', {
      title: '一覧',
      articles: results
    })
  }
};

module.exports = listController;
