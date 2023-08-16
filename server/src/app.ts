const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./database/conn');
const router = require('./router/route');
require("dotenv/config");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hackers know about our stack/server

const PORT = process.env.PORT || 5000;

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
  console.log("Hello World!");
});

connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
  
  // api router 
  app.use("/api", router);
});

const swaggerDefinition = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Swagger API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:8081/api',
            },
        ],
    },
    apis: ['./src/controller/appController.ts', './src/router/route'],
};

const swaggerSpec = swaggerJSDoc(swaggerDefinition);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));