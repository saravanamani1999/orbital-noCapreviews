require("@babel/polyfill");
const express = require('express');
const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const Module = require('../models/module');
const moduleInfo = require('../moduleInfo.json');
const dotenv = require('dotenv');
dotenv.config();
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.inkot.mongodb.net/noCap?retryWrites=true&w=majority`;
const PORT = 3001;

let server;

beforeAll(async () => {
    mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    mongoose.Promise = Promise;
    server = app.listen(PORT);
  });
  
afterAll(done => {
    mongoose.connection.close();
    server.close(done);
});

// describe('thought model tests', () => {
//     it('can create a thought', async () => {
//         const cs1010 = await Module.findOne({ code: "CS1010" });
//         cs1010.forum.push({ author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"})
//         await cs1010.save();
//         await Module.deleteOne({"forum" : {author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"}});
//         const commentsCount = await Module.countDocuments({"code": "CS1010"});
//         expect(commentsCount).toEqual(0);
//     });
// });
describe('route testing', () => {
    it('can get module', async () => {
        jest.setTimeout(10000)
        await request(server)
        .get('/k')
        .expect(500)
    }),

    it('can get module', async () => {
        await request(server)
            .get('/cs1010s')
            .expect(200)
        }),
    it('can get module', async () => {
    await request(server)
        .get('/cs1231')
        .expect(200)
    }),
    it('can get module', async () => {
        await request(server)
            .get('/cg1112')
            .expect(200)
        }),
    it('can get module', async () => {
    await request(server)
        .get('/cs')
        .expect(500)
    }),
    it('can get module', async () => {
        await request(server)
            .get('/eg2311')
            .expect(200)
    }),
    it('can get module', async () => {
        await request(server)
            .get('/eg2313')
            .expect(500)
    }),
    it('can get module', async () => {
        await request(server)
            .get('/cs2040')
            .expect(200)
    }),
    it('can get module', async () => {
    await request(server)
        .get('/cs1010')
        .expect(200)
    });

});