const request = require('supertest');
const app = require('./server/server'); // Import your Express app

describe('GET /movies', () => {
  it('responds with JSON containing a list of movies', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /actors', () => {
  it('responds with JSON containing a list of actors', async () => {
    const response = await request(app).get('/actors');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /actors/:actorId', () => {
    it('responds with JSON containing actor details', async () => {
      // Replace {actorId} with an actual actor ID from your database
      const actorId = 1; // Replace with a valid actor ID
      const response = await request(app).get(`/actors/${actorId}`);
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('actor');
      expect(response.body).toHaveProperty('topRentedMovies');
    });
  
    it('responds with 404 when actor is not found', async () => {
      const actorId = 9999; // An actor ID that does not exist in the database
      const response = await request(app).get(`/actors/${actorId}`);
      expect(response.status).toBe(404);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('error', 'Actor not found');
    });
  });
  