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

describe('module model tests', () => {
    it('can create a comment', async () => {
        const cs1010 = await Module.findOne({ code: "CS1010" });
        cs1010.forum.push({ author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"})
        await cs1010.save();
        const query = {forum: [{ author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"}]};
        const commentsCount = await Module.countDocuments(query);
        expect(commentsCount).toEqual(1);
    }),

    it('can create a comment', async () => {
        const cs1231 = await Module.findOne({ code: "CS1231" });
        cs1231.forum.push({ author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"})
        await cs1231.save();
        const commentsCount = await Module.countDocuments({"code": "CS1231"});
        expect(commentsCount).toEqual(1);
    }),

    it('can create a comment', async () => {
        const cg1111 = await Module.findOne({ code: "CG1111" });
        cg1111.forum.push({ author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"})
        await cg1111.save();
        const commentsCount = await Module.countDocuments({"code": "CG1111"});
        expect(commentsCount).toEqual(1);
    }),

    it('can create a comment', async () => {
        const cg1112 = await Module.findOne({ code: "CG1112" });
        cg1112.forum.push({ author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"})
        await cg1112.save();
        const commentsCount = await Module.countDocuments({"code": "CG1112"});
        expect(commentsCount).toEqual(1);
    }),

    it('can create a comment', async () => {
        const cs2030 = await Module.findOne({ code: "CS2030" });
        cs2030.forum.push({ author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"})
        await cs2030.save();
        //await Module.deleteOne({"forum" : {author: "John" , semester: "AY 20/21 Sem 2", major: "life sciences", body: "this was good"}});
        const commentsCount = await Module.countDocuments({"code": "CS2030"});
        expect(commentsCount).toEqual(1);
    })

});