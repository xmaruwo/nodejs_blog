/**
 * listController
 */
const models = require('../models')
const article = models.article;

const listController = {
  async index(req, res) {
    console.log('list index::::')

    const results = await article.findAll();
    console.log(results)
    res.render('lists/index', {
      title: '一覧',
      articles: results
    })
  }
};

module.exports = listController;
