const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv/config");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hackers know about our stack/server

const PORT = process.env.PORT || 5000;

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
  console.log("Hello World!");
  
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
