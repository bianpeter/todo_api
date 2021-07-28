const app = require("../app.js")
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');


const inMemDB = require('./utils/inMemDB')
const {startServer, stopServer, deleteDB} = require('./utils/inMemDB')

let mongoServer

describe('Smoke tests', () =>{
  
  test('Jest works', () => {
    expect(1).toBe(1);
  });

  describe("supertest works", () => {

    test("should return status of 404", async () => {
      const response = await request.get("/badendpoint");
    
      expect(response.status).toBe(404);
    });
  
    test("should return status of 200", async () => {
      const response = await request.get("/api/");
    
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("hello world");
    });
  });

  test('inMemDB works', async () => {
    const Cat = mongoose.model('Cat', { name: String });

    await startServer()

    const kitty = new Cat({ name: 'Zildjian' });
    await kitty.save()

    const doc = await Cat.findOne({name: 'Zildjian'})
    expect(doc.name).toBe('Zildjian')

    await deleteDB([Cat])

    const none = await Cat.countDocuments()
    expect(none).toBe(0)

    await stopServer(mongoServer)

  });
});
