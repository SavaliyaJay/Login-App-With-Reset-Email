const mongoose = require('mongoose');
require("dotenv/config");

const connect = async () => {  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1); // stop the app
  }
}

module.exports = connect;
