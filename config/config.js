import mysql from 'mysql2/promise';
import dotenv from "dotenv"

dotenv.config();

const { DB_NAME, DB_HOSTNAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

// providing the details to connect to the mysql server.
const client = await mysql.createConnection(
    {
        host: DB_HOSTNAME,          // if not provided, host will be considered as localhost
        port: DB_PORT,              // if not provided, port will be considered as default port automatically.
        user: DB_USER,
        password: DB_PASSWORD,
    }
);

// function for creating the DataBase
export async function createDataBase() {
    try {
        // Query to get a list of databases
        const result = await client.query(`SHOW DATABASES LIKE '${DB_NAME}'`);

        // Check if the specific database exists
        const dbExist = result[0].length;

        if (!dbExist) {
            await client.query(`CREATE DATABASE ${DB_NAME}`);
            console.log(`Database ${DB_NAME} is created successfully.`)
            createTable()
        }
        else {
            createTable()
            console.log(`Database ${DB_NAME} is connected successfully.`)
        }
    }
    catch (error) {
        console.log(error)
    }
    return DB_NAME;
}

// function for creating the Tables.
async function createTable() {
    try {
        await client.query(`USE ${DB_NAME}`);
        const survey = await client.query(`SHOW TABLES LIKE 'survey'`);
        if (!survey[0].length) {
            await client.query(
                `CREATE TABLE survey(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    survey_name VARCHAR(100) NOT NULL,
                    question VARCHAR(150),
                    \`true\` INT,
                    \`false\` INT
                )`
            );
            console.log('Table "survey" is created successfully.')
        }
    }
    catch (error) {
        console.log(error)
    }
}

export default client;