import { config } from "dotenv";
import express from "express";
import { createDataBase } from "./config/config.js";
import surveyRouter from "./routes/surveyRoutes.js";
import userRouter from "./routes/userRoutes.js";
config();

const { PORT, HOSTNAME } = process.env;

const { json } = express;

// Creating the express application.
const server = express();

// Built in middleware to parse the json in the requests.
server.use(json());

// Configuring the user routes with the application "server".
server.use(userRouter);

// Configuring the survey routes with the application "server".
server.use(surveyRouter);

// Running the Express server on specific port.
server.listen(
    PORT, HOSTNAME, () => {
        // checking and creating if the Database does not exist.
        createDataBase()
        console.log(`Express server is running on port ${PORT}.`)
    }
)