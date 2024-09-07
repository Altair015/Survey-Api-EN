import client from "../config/config.js";
import { config } from "dotenv";
config();

const { DB_NAME } = process.env;

// Function for returning the list of surveys available in form of the list of Survey Names.
export const getSurveys = async (req, res) => {
    try {
        await client.query(`USE ${DB_NAME}`)
        let surveyList = await client.query(`SELECT DISTINCT survey_name from survey`);
        if (surveyList[0].length) {
            surveyList = surveyList[0].map(
                (survey) => {
                    return survey.survey_name
                }
            )
            return res.status(200).json({ "Survey List": surveyList })
        }
        else {
            return res.status(404).json({ msg: "No surveys found." })
        }
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error." })
    }
}

// Function to create the set of questions related for a survey.
export const createSurvey = async (req, res) => {
    const { surveyName, questions } = req.body;

    // Validating if the keys "surveyName" and "questions" are specified while accessing the endpoint /create.
    if (Object.keys(req.body).length !== 2) {
        return res.status(401).json({ msg: "Some fields are missing." })
    }

    // Checking if the value for the key answers is non-empty.
    if (questions.length === 0) {
        return res.status(401).json({ msg: "Create atleast 1 question for the survey." })
    }

    // Checking if the value for the key surveyName is non-empty.
    if (!surveyName) {
        return res.status(401).json({ msg: "Survey Name is mandatory. It cannot be empty or falsy value." })
    }

    // Creating a new Survey if the survey with the name provided by the user does not exist.
    try {
        await client.query(`USE ${DB_NAME}`)
        const surveyExist = await client.query(`SELECT survey_name FROM survey WHERE survey_name='${surveyName}'`);
        if (surveyExist[0].length) {
            return res.status(208).json({ msg: `A survey with the survey name ${surveyName} exists. Please select different survey name.` })
        }
        else {
            await Promise.all(questions.map(
                async (question) => {
                    await client.query(`INSERT INTO survey (survey_name,question) VALUES('${surveyName}','${question}')`);
                }
            ))
            return res.status(201).json({ msg: "Survey created successfully." });
        }
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error." })
    }
}

// Function to return the set of questions related to a specific survey.
export async function getSurvey(req, res) {
    const { surveyName } = req.body;

    // Validating if the key "surveyName" is specified while accessing the endpoint /survey.
    if (!Object.keys(req.body).includes("surveyName")) {
        return res.status(401).json({ msg: "key surveyName is missing." })
    }

    // Checking if the value for the key surveyName is non-empty.
    else if (!surveyName) {
        return res.status(401).json({ msg: "Survey name cannot be empty." })
    }

    // Returning the set of questions related to a specific survey in order. 
    try {
        await client.query(`USE ${DB_NAME}`)
        let questions = await client.query(`SELECT question FROM survey WHERE survey_name='${surveyName}' ORDER BY id`);
        if (questions[0].length) {
            questions = questions[0].map(
                (question) => {
                    return question.question
                }
            )
            return res.status(200).json({ "Survey Name": surveyName, "Questions": questions })
        }
        else {
            return res.status(404).json({ msg: `No survey found with the name ${surveyName}.` })
        }
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error." })
    }
}

// Function to update the response of the user for the questions of a specific survey.
export async function takeSurvey(req, res) {
    const { surveyName, answers } = req.body;

    // Validating if the keys "surveyName" and "answers" are specified while accessing the endpoint /take.
    if (Object.keys(req.body).length !== 2) {
        return res.status(401).json({ msg: "Some fields are missing." })
    }

    // Checking if the value for the key answers is non-empty.
    if (answers.length === 0) {
        return res.status(401).json({ msg: "Answers must be provided in the same order as the questions for the survey." })
    }

    // Checking if the value for the key surveyName is non-empty.
    if (!surveyName) {
        return res.status(401).json({ msg: "Survey Name is mandatory. It cannot be empty or falsy value." })
    }

    // Updating the response of the user against the questions of the survey.
    try {
        await client.query(`USE ${DB_NAME}`)
        const survey = await client.query(`SELECT * FROM survey WHERE survey_name='${surveyName}' ORDER BY id`);
        if (survey[0].length !== answers.length) {
            return res.status(401).json({ msg: "Invalid Input.All questions are mandatory to be answered in order." })
        }
        const updateSuvey = answers.map(
            async (answer, index) => {
                if (answer) {
                    return await client.query(`UPDATE survey SET \`true\`=${survey[0][index].true + 1} WHERE survey_name='${surveyName}' AND question='${survey[0][index].question}'`)
                }
                else {
                    return await client.query(`UPDATE survey SET \`false\`=${survey[0][index].false + 1} WHERE survey_name='${surveyName}' AND question='${survey[0][index].question}'`)
                }
            }
        )
        await Promise.all(updateSuvey);
        return res.status(200).json({ msg: "Your response has been submitted successfully." })
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error." })
    }
}

// Function to view the responses for the questions of the specific survey.
export const viewSurveyResults = async function (req, res) {
    const { surveyName } = req.body;

    // Checking if the key surveyName is specified or not while accessing the endpoint /view.
    if (!Object.keys(req.body).includes("surveyName")) {
        return res.status(401).json({ msg: "key surveyName is missing." })
    }

    // Checking if the value for the key surveyName is non-empty.
    else if (!surveyName) {
        return res.status(401).json({ msg: "Survey name cannot be empty." })
    }

    // Returing all the questions with responses.
    try {
        await client.query(`USE ${DB_NAME}`)
        const questions = await client.query(`SELECT question,\`true\`,\`false\` FROM survey WHERE survey_name='${surveyName}' ORDER BY id`);
        if (questions[0].length) {
            return res.status(200).json({ "Survey Name": surveyName, "Questions": questions[0] })
        }
        else {
            return res.status(404).json({ msg: `No survey found with the name ${surveyName}.` })
        }
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal Server Error." })
    }
}