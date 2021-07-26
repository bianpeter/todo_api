const app = require("../app.js")
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const DashBoardList = require("../models/DashboardList")

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, dbName: "verifyMASTER", useCreateIndex: true, useUnifiedTopology: true });
});

afterAll(async () => {
  let mongoServer
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if(mongoServer){
    await mongoServer.stop();
  }
});

//simple test
it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});

/*
afterEach(async () => {
  await DashBoardList.deleteMany({});
});
*/

//endpoint testing
describe("endpoint tests", () => {

  it("gets the test endpoint", async () => {
    const response = await request.get("/badendpoint");
  
    expect(response.status).toBe(404);
  });

  it("gets the test endpoint", async () => {
    const response = await request.get("/api/");
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("hello world");
  });
});

//DB testing
/*
it("in memory DB connection", async () => {
  mongoServer = await MongoMemoryServer.create();
  mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, dbName: "verifyMASTER", useCreateIndex: true, useUnifiedTopology: true });

  expect(1).toBe(1)

  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
})
*/

describe("/api/userboard testing", () => {

  it("should return 401 for missing header", async () => {
    const response = await request.get("/api/userboards"); 
  
    expect(response.status).toBe(401);
  });

  it("should return 200 for header", async () => {
    const response = await request.get("/api/userboards").set("user_id", "123"); 
  
    expect(response.status).toBe(200);
  });


})

