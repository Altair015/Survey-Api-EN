import { Router } from "express";
import { createSurvey, getSurvey, getSurveys, takeSurvey, viewSurveyResults } from "../controllers/surveyControllers.js";
import authJwt from "../middlewares/authJWT.js";

const surveyRouter = Router();

// Route/Endpoint for creating the Survey.
surveyRouter.post("/create", authJwt, createSurvey);

// Route/Endpoint for returing the list of Surveys.
surveyRouter.get("/surveys", authJwt, getSurveys);

// Route/Endpoint for returing the list of questions for specific survey.
surveyRouter.post("/survey", authJwt, getSurvey);

// Route/Endpoint for submiting responses for the list of questions for specific survey.
surveyRouter.put("/take", authJwt, takeSurvey);

// Route/Endpoint for viewing the responses for the list of questions for specific survey.
surveyRouter.post("/view", authJwt, viewSurveyResults)

export default surveyRouter;