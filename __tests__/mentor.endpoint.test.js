const request = require('supertest');
const api = require('../api');
const ChatGPT = require('../models/ChatGPT');

jest.mock('../models/ChatGPT');

describe('Mentor Endpoint Tests', () => {
    it('should generate a mentor chat response', async () => {
        const message = 'test message';
        const expectedResponse = 'test response';
        ChatGPT.generateMentorChat.mockResolvedValueOnce(expectedResponse);
      
        const response = await request(api).post('/mentor/chat').send({ message });
      
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual(expectedResponse);
      });
      

      it('should handle errors from ChatGPT', async () => {
        const message = 'message';
        const expectedError = new Error('error');
        ChatGPT.generateMentorChat.mockRejectedValueOnce(expectedError);
      
        const response = await request(api).post('/mentor/chat').send({ message });
      
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual( expectedError.message );
      });
      
});
