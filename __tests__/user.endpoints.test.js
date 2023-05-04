const { createDbEnv, populateDbEnv, destroyDbEnv } = require('../config/setup-test-db')

const request = require('supertest');
const api = require('../api')
const server = request(api)

describe("Auth Endpoint Tests", () => {
    beforeEach(async () => {
        await createDbEnv()
        await populateDbEnv()
    })

    afterEach(async () => {
        await destroyDbEnv()
    })

    it('Should create a user on POST request to /auth/register with correct credentials', async () => {
        const response = await server.post('/auth/register').send({ username: "admin2", password: "admin" });

        expect(response.statusCode).toEqual(201)
        expect(typeof response.body.username).toEqual("string")
    });

    it('Should reject POST request to /auth/register with incorrect credentials', async () => {
        const response = await server.post('/auth/register').send({ usr: "admin2", password: "admin" });

        expect(response.statusCode).toEqual(422)
    });

    it('Should login existing user on POST request to /auth/login with correct credentials', async () => {
        const response = await server.post('/auth/login').send({ username: "admin", password: "password" });
        expect(response.statusCode).toEqual(200)
        expect(typeof response.body.username).toEqual("string")
    });

    it('Should reject request to POST /auth/login with incorrect credentials (wrong username)', async () => {
        const response = await server.post('/auth/login').send({ username: "admi", password: "admin" });

        expect(response.statusCode).toEqual(400)
    });

    it('Should reject request to POST /auth/login with incorrect credentials (wrong password)', async () => {
        const response = await server.post('/auth/login').send({ username: "admin", password: "admi" });

        expect(response.statusCode).toEqual(401)
    });
})