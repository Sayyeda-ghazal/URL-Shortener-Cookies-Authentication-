const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
async function ConnectToMongoDB(url) {
    try {
      await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('DB connected');
    } catch (err) {
      console.error('DB connection error:', err);
    }
  }

module.exports = {
    ConnectToMongoDB,
}