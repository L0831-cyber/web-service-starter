const request = require('supertest');
const app = require('../src/app');

describe('Items API', () => {
  describe('GET /api/v1/items', () => {
    it('should return a list of items', async () => {
      const res = await request(app).get('/api/v1/items');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/v1/items', () => {
    it('should create a new item', async () => {
      const res = await request(app)
        .post('/api/v1/items')
        .send({ name: 'Test Item', description: 'A test item' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Test Item');
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app)
        .post('/api/v1/items')
        .send({ description: 'No name' });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
    });
  });
});
