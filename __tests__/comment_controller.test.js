const httpMocks = require("node-mocks-http");
const commentController = require("../controllers/comment_controller");
const Comment = require("../model/comment_model");

jest.mock("../model/comment_model"); // Mock the Comment model

describe("Comment Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe("createComment", () => {
    it("should create a comment successfully", async () => {
      req.body = {
        user_id: 1,
        article_id: 5,
        comment: "This is a test comment",
      };
      
      Comment.createComment.mockResolvedValue({
        comment_id: 10,
        ...req.body,
      });
      
      await commentController.createComment(req, res, next);
      
      expect(res.statusCode).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        message: "Comment created successfully",
        comment: { comment_id: 10, ...req.body },
      });
    });
  });

  describe("getCommentById", () => {
    it("should return a comment successfully", async () => {
      req.params.comment_id = 1;
      Comment.getCommentById.mockResolvedValue({
        comment_id: 1,
        user_id: 1,
        article_id: 5,
        comment: "This is a test comment",
        reply: [],
      });
      
      await commentController.getCommentById(req, res, next);
      
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        comment_id: 1,
        user_id: 1,
        article_id: 5,
        comment: "This is a test comment",
        reply: [],
      });
    });

    it("should return a 404 error if comment not found", async () => {
      req.params.comment_id = 1;
      Comment.getCommentById.mockResolvedValue(null);
      
      await commentController.getCommentById(req, res, next);
      
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ error: "Comment not found" });
    });
  });

  describe("updateComment", () => {
    it("should update a comment successfully", async () => {
      req.body = { comment_id: 1, comment: "Updated comment" };
      Comment.updateComment.mockResolvedValue({
        comment_id: 1,
        comment: "Updated comment",
      });
      
      await commentController.updateComment(req, res, next);
      
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        message: "Comment updated successfully",
        comment: { comment_id: 1, comment: "Updated comment" },
      });
    });

    it("should return a 404 error if comment not found for update", async () => {
      req.body = { comment_id: 1, comment: "Updated comment" };
      Comment.updateComment.mockResolvedValue(null);
      
      await commentController.updateComment(req, res, next);
      
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ error: "Comment not found" });
    });
  });

  describe("deleteComment", () => {
    it("should delete a comment successfully", async () => {
      req.params.comment_id = 1;
      Comment.deleteComment.mockResolvedValue(true);
      
      await commentController.deleteComment(req, res, next);
      
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        message: "Comment deleted successfully",
        comment: true,
      });
    });

    it("should return a 404 error if comment not found for deletion", async () => {
      req.params.comment_id = 1;
      Comment.deleteComment.mockResolvedValue(false);
      
      await commentController.deleteComment(req, res, next);
      
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ error: "Comment not found" });
    });
  });
});
