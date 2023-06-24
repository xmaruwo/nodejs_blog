/**
 * articleController
 */
const models = require('../models');
const article = models.article;

const redirectCompletePath = '/articles/complete';

const articleController = {
  // ユーザー記事一覧
  async index(req, res) {
    const user_id = req.params.user_id
    const results = await article.findAll({
      where: {
        user_id: user_id
      }
    })
    console.log(results)
    res.render('articles/index', {
      title: 'ユーザー記事一覧',
      articles: results,
    })
  },

  // 新規登録画面
  async new(req, res) {
    res.render('articles/new.ejs', {
      title: '新規登録',
      errors: [],
    })
  },
  // 必須入力チェック
  async isEmpty(req, res, next) {
    console.log('articleController::confirm::: isEmpty');
    const title = req.body.articleTitle;
    const category = req.body.categoryValue;
    const summary = req.body.articleSummary;
    const content = req.body.articleContent;
    const errors = [];

    console.log(req.body);

    if (title === '') {
      errors.push('タイトルを入力して下さい');
    }

    console.log(title);
    console.log(category);
    console.log(summary);
    console.log(content);
    console.log(errors);
    if (errors.length > 0) {
      res.render('articles/new', {
        title: '新規登録',
        articleTitle: title,
        categoryValue: category,
        articleSummary: summary,
        articleContent: content,
        errors: errors,
      })
    } else {
      next();
    }
  },
  // 確認画面
  async isConfirm(req, res) {
    console.log('articleController::confirm::: confirm');
    const title = req.body.articleTitle;
    const category = req.body.categoryValue;
    const summary = req.body.articleSummary;
    const content = req.body.articleContent;

    res.render('articles/confirm', {
      title: '',
      articleTitle: title,
      categoryValue: category,
      articleSummary: summary,
      articleContent: content,
    })
  },
  // 登録
  async isCreate(req, res) {
    console.log('articleController::confirm::: isCreate');
    const title = req.body.articleTitle;
    const category = req.body.categoryValue;
    const summary = req.body.articleSummary;
    const content = req.body.articleContent;

    const articleData = {
      title: title,
      category: category,
      summary: summary,
      content: content,
      user_id: req.session.userId,
    }
    const results = await article.create(articleData);
    console.log(results);

    res.redirect(redirectCompletePath);
  },
  // 登録完了
  async complete(req, res) {
    res.render('articles/complete')
  },
  // 詳細表示
  async show(req, res) {
    const id = req.params.id
    const result = await article.findOne({
      where: {
        id: id
      }
    })
    res.render('articles/show', {
      article: result
    })
  }
};

module.exports = articleController;
