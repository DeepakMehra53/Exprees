import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../createApp.mjs';



describe('Create User and Login', () => {
    let app;

    beforeAll(() => {
        mongoose.connect('mongodb://127.0.0.1:27017/express_tutorial_test')
            .then(() => console.log("connected to Test database"))
            .catch((err) => console.log(`Error :${err}`))
        app = createApp()
    })

    it(' should create the user', async () => {
        const response = await request(app).post('/api/users').send({
            username: "deepak12",
            password: "password",
            displayName: "Deepak Hello",
        })
        expect(response.statusCode).toBe(201)

    });

    it('should log the user in', async () => {
        const response = await request(app).post('/api/auth')
            .send({ username: "deepak12", password: "password", })
            .then((res) => {
               return request(app)
                .get('/api/auth/status')
                .set('Cookie', res.headers['set-cookie'])
            })
        expect(response.statusCode).toBe(200)
    })


    afterAll(async () => { 
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close()
    })
});
