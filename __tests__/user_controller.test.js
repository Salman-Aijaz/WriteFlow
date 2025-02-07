const { register } = require('../controllers/user_controller');
const { registerUser } = require('../model/user_model');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');

jest.mock('../model/user_model'); // Mock the user model

describe('User Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      req.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
        role_id: 1,
      };

      // Mock the registerUser function to return a user object
      registerUser.mockResolvedValue({ name: 'John Doe' });

      await register(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        message: 'User John Doe is successfully registered',
      });
    });

    it('should return an error if email already exists', async () => {
      req.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
        role_id: 1,
      };

      // Mock the registerUser function to throw a unique violation error
      registerUser.mockRejectedValue({ code: '23505' });

      await register(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Email already exists',
      });
    });

    it('should return a server error on unexpected error', async () => {
      req.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
        role_id: 1,
      };

      // Mock the registerUser function to throw a generic error
      registerUser.mockRejectedValue(new Error('Some error'));

      await register(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Error registering user',
      });
    });
  });
}); 