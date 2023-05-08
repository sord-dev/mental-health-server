const { createDbEnv, populateDbEnv, destroyDbEnv } = require('../config/setup-test-db');
const request = require('supertest');
const api = require('../app');
const server = request(api);
const Comment = require("../models/Comment")

describe('Comment Endpoint Tests', () => {
  beforeEach(async () => {
    await createDbEnv();
    await populateDbEnv();
  });

  afterEach(async () => {
    await destroyDbEnv();
  });

  it('Should return an array of comments for a specific forum on GET request to /comments/:id', async () => {
    const response = await server.get('/comments/1');

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Should return an error message when trying to get comments for a non-existent forum', async () => {
    const response = await server.get('/comments/99');

    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual({ error: 'No comments found for forum with ID 99' });
  });

  it('Should create a new comment on an existing forum post', async () => {
  const response = await server.post('/comments/1').send({
    content: 'This is a new comment',
    user_id: '1'
  });

  expect(response.statusCode).toEqual(201);
  expect(response.body.message).toEqual('Comment created successfully');
  expect(response.body.comment).toHaveProperty('content', 'This is a new comment');

});


  it('Should return an error message when trying to create a comment on a forum post that does not exist', async () => {
    const response = await server.post('/comments/99').send({
      content: 'This is a new comment'
    });
    
    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual({ error: 'Could not create comment: No such forum' });
  });

  it('Should delete a comment with a valid id', async () => {
    const response = await server.delete(`/comments/1`);
    expect(response.statusCode).toEqual(204);
    
  });

  it('Should return an error message if the comment does not exist', async () => {
    const response = await server.delete('/comments/999');
    expect(response.statusCode).toEqual(500);
    expect(response.body.error).toEqual('No comments found with ID 999');
  });

 
  
});
