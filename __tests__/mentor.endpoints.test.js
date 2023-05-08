const { createDbEnv, populateDbEnv, destroyDbEnv } = require('../config/setup-test-db.js');
const request = require('supertest');
const api = require('../app.js');
const server = request(api);

describe('Mentor Endpoint Tests', () => {
  beforeEach(async () => {
    await createDbEnv();
    await populateDbEnv();
  });

  afterEach(async () => {
    await destroyDbEnv();
  });

  it('Should return an array of mentors on GET request to /mentor/info', async () => {
    const response = await server.get('/mentor/info');

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });


  it('Should return an array of mentors with prices and categories on GET request to /mentor/prices', async () => {
    const response = await server.get('/mentor/prices');

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Should return a string on POST request to /mentor/chat', async () => {
    const response = await server.post('/mentor/chat').send({ message: 'Heya there', mentor: 'Morgan' } );

    expect(response.statusCode).toEqual(200);
    expect(typeof response.body.message).toBe("string");
  });
  
});
  

