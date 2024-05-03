
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import logger from "./utils/logger";
import error from "./middlewares/error";
import { createConnection } from "./db-init/dbConn";

// all routes
import user from "./routes/user";
import blog from "./routes/blog";

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

// Block all unwanted headers using helmet
app.use(helmet());

app.use(
  morgan("common", {
    stream: {
      write: (message) => logger.http(message),
    },
  })
);

// define a simple route
app.use("/user", user);
app.use("/blog", blog);

app.use(error);

createConnection();
// listen for requests
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});