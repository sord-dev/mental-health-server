const { createDbEnv, populateDbEnv, destroyDbEnv } = require('../config/setup-test-db');
const request = require('supertest');
const api = require('../app');
const server = request(api);

describe('Forum Endpoint Tests', () => {
  beforeEach(async () => {
    await createDbEnv();
    await populateDbEnv();
  });

  afterEach(async () => {
    await destroyDbEnv();
  });

  it('Should return an array of forums on GET request to /forums', async () => {
    const response = await server.get('/forums');

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Should return a specific forum on GET request to /forums/:id', async () => {

    const response = await server.get(`/forums/forum/1`);

    expect(response.statusCode).toEqual(200);
  });

  it('Should return an error message when trying to get a forum for a user that does not exist', async () => {
    const response = await server.get('/forums/99');
  
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: 'Not Found', status: 404 });
  });
  

  it('Should return a forum of id 1 on GET request to /forums/forum/:id', async () => {
    const response = await server.get('/forums/forum/1');

    expect(response.statusCode).toEqual(200);
  });

  it('Should return 404 error if forum with given ID does not exist', async () => {
    const response = await server.get('/forums/forum/999');

    expect(response.statusCode).toEqual(400);
  });

  it('Should create a new forum on POST request to /forums with correct data', async () => {
    const forumData = {
      title: 'Test Forum',
      content: 'This is a test forum',
      user_id: 1,
    }
    const response = await server.post('/forums').send(forumData)
    expect(response.statusCode).toEqual(201)
    expect(response.body.title).toEqual(forumData.title)
    expect(response.body.content).toEqual(forumData.content)
    expect(response.body.user_id).toEqual(forumData.user_id)
  })

  it('Should reject POST request to /forums with missing data', async () => {
    const forumData = {
      content: 'This is a test forum',
      user_id: 1,
    }

    const response = await server.post('/forums').send(forumData)

    expect(response.statusCode).toEqual(422)
  })

  it('Should reject POST request to /forums with invalid user ID', async () => {
    const forumData = {
      title: 'Test Forum',
      content: 'This is a test forum',
      user_id: 9999,
    }

    const response = await server.post('/forums').send(forumData)

    expect(response.statusCode).toEqual(500)
  })

  it('Should delete a forum on DELETE request to /forums/:id', async () => {
    const forumToDelete = {
      id: 1,
      title: 'Test Forum',
      content: 'This is a test forum',
      user_id: 1,
    };
    const response = await server.delete(`/forums/${forumToDelete.id}`);
    expect(response.statusCode).toEqual(204);
  
    // Verify that the forum has been deleted from the database
    const getResponse = await server.get(`/forums/${forumToDelete.id}`);
    expect(getResponse.statusCode).toEqual(404);
  });
  
  it('Should return an error message when trying to delete a non-existent forum', async () => {
    const response = await server.delete('/forums/999');
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ error: 'No such forum' });
  });

  it('should update the title and content of a forum post', async () => {
    const response = await server.patch('/forums/1').send({ title: 'New Title', content: 'New Content' });
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Forum post updated successfully');
  
    const updatedForum = response.body.forum; // Accessing the updated forum object from the response
    expect(updatedForum.title).toEqual('New Title'); // Accessing the title property of the updated forum
    expect(updatedForum.content).toEqual('New Content'); // Accessing the content property of the updated forum
  });
  
  it('should update the title of a forum post', async () => {
    const response = await server.patch('/forums/1').send({ title: 'New Title' });
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Forum post updated successfully');
  
    const updatedForum = response.body.forum;
    expect(updatedForum.title).toEqual('New Title');
  });
  
  it('should update the content of a forum post', async () => {
    const response = await server.patch('/forums/1').send({ content: 'New Content' });
    expect(response.statusCode).toEqual(400);
    
  });
  

  it('should return a 404 error if the forum post does not exist', async () => {
    const response = await server.patch('/forums/999').send({ title: 'New Title', content: 'New Content' });
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toEqual('Forum post not found');
  });

  it('should return a 400 error if the request body is missing title and content', async () => {
    const response = await server.patch('/forums/1').send({});
    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual('Failed to update forum post: title');
  });

  it('should return a 500 error if there is a server error', async () => {
    const response = await server.patch('/forums/notanumber').send({ title: 'New Title', content: 'New Content' });
    expect(response.statusCode).toEqual(500);
    expect(response.body.error).toBeDefined();
  });
});
  

