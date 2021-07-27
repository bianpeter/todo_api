const app = require("../app.js")
const supertest = require("supertest");
const request = supertest(app);
const {startServer, stopServer, deleteDB} = require('./utils/inMemDB')
const userBoard = require('../models/DashboardList')


describe("GET- /api/userboard", () => {
  let mongoServer

  beforeAll(async () => {
    await startServer()
  })

  afterAll(async () => {
    await stopServer(mongoServer)
  })

  afterEach(async () => {
    await deleteDB([userBoard])
  })

  it("should return 401 for missing header", async () => {
    //GIVEN
    //app started
    //WHEN
    const response = await request.get("/api/userboard"); 
    //THEN
    expect(response.status).toBe(401);
  });

  it("should return 200 for header", async () => {
    //GIVEN
    //app started
    //WHEN
    const response = await request.get("/api/userboard").set("user_id", "123"); 
    //THEN
    expect(response.status).toBe(200);
  });
})
