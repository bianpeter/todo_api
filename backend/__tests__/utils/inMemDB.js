const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server")

let mongoServer

const startServer = async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { 
    useNewUrlParser: true, 
    dbName: "verifyMASTER", 
    useCreateIndex: true, 
    useUnifiedTopology: true });
}

const stopServer = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}

const deleteDB = async (models) => {
  const deletion = models.map(model => model.deleteMany())
  await Promise.all(deletion)
} 

module.exports = {startServer, stopServer, deleteDB}