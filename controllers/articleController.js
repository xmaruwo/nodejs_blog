/**
 * articleController
 */
const models = require('../models');
const article = models.article;

const redirectCompletePath = '/articles/complete/';

const articleController = {
  // ユーザー記事一覧
  async index(req, res) {
    const user_id = req.params.user_id;
    const results = await article.findAll({
      where: {
        user_id: user_id
      }
    });

    res.render('articles/index', {
      title: 'ユーザー記事一覧',
      articles: results,
    });
  },

  // 新規登録画面
  async new(req, res) {
    res.render('articles/new.ejs', {
      title: '新規登録',
      errors: [],
    });
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

    if (errors.length > 0) {
      const formType = req.body.formType;
      if (formType === 'new') {
        res.render('articles/new', {
          title: '新規登録',
          articleTitle: title,
          categoryValue: category,
          articleSummary: summary,
          articleContent: content,
          errors: errors,
        });
      } else if (formType === 'edit') {
        const user_id = req.params.user_id;
        const id = req.params.id;
        console.log(article);
        res.render('articles/edit', {
          title: '記事更新',
          action: '/articles/' + user_id + '/confirm/' + id,
          articleTitle: title,
          categoryValue: category,
          articleSummary: summary,
          articleContent: content,
          errors: errors,
        });
      }
    } else {
      next();
    }
  },

  // 確認画面
  async isConfirm(req, res) {
    console.log('articleController::confirm::: confirm');

    const formType = req.body.formType;
    const title = req.body.articleTitle;
    const category = req.body.categoryValue;
    const summary = req.body.articleSummary;
    const content = req.body.articleContent;

    if (formType === 'new') {
      res.render('articles/confirm', {
        title: '登録内容確認',
        action: '/articles/create',
        articleTitle: title,
        categoryValue: category,
        articleSummary: summary,
        articleContent: content,
      });
    } else if (formType === 'edit') {
      const user_id = req.params.user_id;
      const id = req.params.id;
      res.render('articles/confirm', {
        title: '更新内容確認',
        action: '/articles/' + user_id + '/update/' + id,
        articleTitle: title,
        categoryValue: category,
        articleSummary: summary,
        articleContent: content,
      });
    }
  },

  // 登録
  async isCreate(req, res) {
    console.log('articleController::confirm::: isCreate');
    const title = req.body.articleTitle;
    const category = req.body.categoryValue;
    const summary = req.body.articleSummary;
    const content = req.body.articleContent;
    const type = 'create';

    const articleData = {
      title: title,
      category: category,
      summary: summary,
      content: content,
      user_id: req.session.userId,
    };
    const results = await article.create(articleData);
    console.log(results);

    res.redirect(redirectCompletePath + type);
  },

  // 登録完了
  async complete(req, res) {
    const type = req.params.type;
    let title;
    let message;

    if (type == 'create') {
      title = '登録完了';
      message = '登録が完了しました';
    } else if (type == 'update') {
      title = '更新完了';
      message = '更新が完了しました';
    }
    res.render('articles/complete', {
      title: title,
      message: message,
    });
  },

  // 詳細表示
  async show(req, res) {
    const id = req.params.id;
    const result = await article.findOne({
      where: {
        id: id
      }
    });
    res.render('articles/show', {
      article: result
    });
  },

  // 編集画面
  async edit(req, res) {
    console.log('edit::::');
    const user_id = req.params.user_id;
    const id = req.params.id;
    const errors = [];

    if (user_id == req.session.userId) {
      const result = await article.findOne({
        where: {
          id: id,
          user_id: user_id
        }
      });
      console.log(result);
      res.render('articles/edit', {
        action: '/articles/' + user_id + '/confirm/' + id,
        articleTitle: result.title,
        categoryValue: result.category,
        articleSummary: result.summary,
        articleContent: result.content,
        errors: errors
      });
    } else {
      errors.push('この記事の編集権限はありません')
      res.render('articles/message.ejs', {
        errors: errors
      });
    }
  },

  // 更新
  async update(req, res) {
    console.log('update::::::')
    const id = req.params.id;
    const title = req.body.articleTitle;
    const category = req.body.categoryValue;
    const summary = req.body.articleSummary;
    const content = req.body.articleContent;
    const user_id = req.params.user_id;
    const type = 'update';

    const result = await article.update(
      {
        title: title,
        category: category,
        summary: summary,
        content: content
      },
      {
        where: { id: id, user_id: user_id }
      }
    ).then((e) => {
      console.log('then....')
      console.log(e);
    });

    console.log(result);
    res.redirect(redirectCompletePath + type);
  }
};

module.exports = articleController;
