const httpMocks = require('node-mocks-http');
const articleController = require('../controllers/article_controller');
const Article = require('../model/article_model');

jest.mock('../model/article_model'); // Mock the article model

describe('Article Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('createPost', () => {
    it('should create an article successfully', async () => {
      req.body = {
        user_id: 1,
        title: 'Test Article',
        content: 'This is a test article.',
      };
      req.file = { filename: 'test-image.png' };

      Article.createArticle.mockResolvedValue({ article_id: 10, ...req.body, image: req.file.filename });

      await articleController.createPost(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        message: 'Article created successfully',
        article: { article_id: 10, ...req.body, image: req.file.filename },
      });
    });

    it('should return an error if file upload fails', async () => {
      req.body = {
        user_id: 1,
        title: 'Test Article',
        content: 'This is a test article.',
      };
      const error = new Error('Upload error');
      upload.mockImplementation((req, res, cb) => cb(new Error('Upload error')));
      await articleController.createPost(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Error uploading file' });
    });
  });

  describe('getArticle', () => {
    it('should return an article successfully', async () => {
      req.params.article_id = 1;
      Article.getArticleById.mockResolvedValue({ article_id: 1, title: 'Test Article', content: 'This is a test article.' });

      await articleController.getArticle(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        message: 'Article',
        article: { article_id: 1, title: 'Test Article', content: 'This is a test article.' },
      });
    });

    it('should return a 404 error if article not found', async () => {
      req.params.article_id = 1;
      Article.getArticleById.mockResolvedValue(null);

      await articleController.getArticle(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Article not found' });
    });
  });

  describe('updateArticle', () => {
    it('should update an article successfully', async () => {
      req.params.article_id = 1;
      req.body = { title: 'Updated Title', content: 'Updated content.' };
      Article.updateArticle.mockResolvedValue({ article_id: 1, ...req.body });

      await articleController.updateArticle(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        message: 'Article updated successfully',
        article: { article_id: 1, ...req.body },
      });
    });

    it('should return a 404 error if article not found for update', async () => {
      req.params.article_id = 1;
      req.body = { title: 'Updated Title', content: 'Updated content.' };
      Article.updateArticle.mockResolvedValue(null);

      await articleController.updateArticle(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Article not found' });
    });
  });

  describe('deleteArticle', () => {
    it('should delete an article successfully', async () => {
      req.params.article_id = 1;
      Article.deleteArticle.mockResolvedValue(true);

      await articleController.deleteArticle(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({ message: 'Article deleted successfully' });
    });

    it('should return a 404 error if article not found for deletion', async () => {
      req.params.article_id = 1;
      Article.deleteArticle.mockResolvedValue(false);

      await articleController.deleteArticle(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Article not found' });
    });
  });
}); 