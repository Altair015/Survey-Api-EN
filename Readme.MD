Packages used : 
express: For routing.
jsonwebtoken: For JWT authentication.
dotenv: For the environment variables.
mysql2: Connecting the node with MySql database.

morgan: For displaying the status for endpoints on the console.
nodemon: For restarting the server during testing/develoment.

#                                                  DIRECTORY STRUCTURE

│   .env
│   .gitignore
│   package-lock.json
│   package.json
│   Readme.MD
│   server.js
│
├───config
│       config.js
│
├───controllers
│       surveyControllers.js
│       userControllers.js
│
├───middlewares
│       authJWT.js
│
├───routes
│       surveyRoutes.js
│       userRoutes.js
│
└───utilities
        sampleData.js

Create a .env file in the root directory with the following environment variables:

Port number on which the Express server starts.
PORT=4000

Host name of the Express server e.g., localhost, 10.0.0.2 (IP Address of express server machine etc).
HOSTNAME=10.0.0.1

JWT Secret to be used for signing the JSON Web Token. Ensure this key is kept confidential and secure.
JWT_SECRET=3fd7cb02dd6b261e2db18cd79b28f78114e2d4160ef977eb5e0f09fabe7f0542

Expiry time after which the JWT is expired. The format is a number followed by a unit (s for seconds, m for minutes, etc.).Default is set to 3000 seconds (50 minutes).
JWT_EXPIRY=3000s

Name of the Database to be created or accessed.
DB_NAME=survey

Host name for the Database. Change this if the database is hosted on a different machine or network.
DB_HOSTNAME=localhost

Username of the Database. Default is set to 'root', but consider using a dedicated user with limited permissions.
DB_USER=root

Password for the Database. Default is set to 'root'; update to a more secure password as needed.
DB_PASSWORD=root

Port number for the Database on which it is running. Default port for MySQL is 3306; adjust if your database uses a different port.
DB_PORT=3306

Navigate to project directory and start the project using the following command:
                                    
                                    npm install
                                    npm start
                                        or
                                    node server
                                        or
                                    node server.js

The endpoints can be accessed through Rest clients e.g., POSTMAN, Thunder Client etc.

For detailed information of project, please refer the comments in the files as well as the POSTMAN collection.

https://documenter.getpostman.com/view/27237826/2sAXjRW9N7#intro