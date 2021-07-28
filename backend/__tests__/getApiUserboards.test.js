const app = require("../app.js")
const supertest = require("supertest");
const request = supertest(app);
const {startServer, stopServer, deleteDB} = require('./utils/inMemDB')
const UserBoard = require("../models/DashboardList");


describe("GET- /api/userboard", () => {
  let mongoServer

  beforeAll(async () => {
    await startServer()
  })

  afterAll(async () => {
    await stopServer(mongoServer)
  })

  afterEach(async () => {
    await deleteDB([UserBoard])
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
    const response = await request.get("/api/userboard").set("x-user_id", "123"); 
    //THEN
    expect(response.status).toBe(200);
  });

  it("should return userboard", async () => {
    //GIVEN
    //app started
    //WHEN
    const response = await request.get("/api/userboard").set("x-user_id", "123") 
    //THEN
    expect(response.status).toBe(200);

    const count = await UserBoard.countDocuments();
    expect(count).toBe(1)

    const userBoardInDB = await UserBoard.findOne();
    expect(userBoardInDB.user_id).toBe("123");

    const _id = await userBoardInDB._id
    expect(_id).not.toBe(undefined);
    //expect(typeof response.body.results).toBe(undefined);
    expect(response.body.userBoard).not.toBeNull();
    //expect(response.body.userBoard.user_id).toBe(1);
  });

  it("should return userboard", async () => {
    //GIVEN
    await request
      .get("/api/userboard")
      .set("x-user_id", "123") 
    const userboardInDB = await UserBoard.findOne();
    const id = userboardInDB._id;

    //WHEN
    await request
      .get("/api/userboard")
      .set("x-user_id", "123") 

    //THEN
    const count2 = await UserBoard.countDocuments();
    expect(count2).toBe(1)

    const userBoardInDB2 = await UserBoard.findOne();
    const id2 = await userBoardInDB2._id
    expect(id2).not.toBe(id);
  });

});
