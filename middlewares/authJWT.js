import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

const { JWT_SECRET } = process.env;

// Middleware for authentication of the JWT token sent from REST Client or front end.
function authJwt(req, res, next) {
    const token = req.headers.authorization.split(" ");
    if (token[0] === "JWT") {
        jwt.verify(
            token[1],
            JWT_SECRET,
            async (err, verifiedToken) => {
                if (err) {
                    return res.status(401).json({ failure: "Invalid Token" })
                }
                else {
                    try {
                        next()
                    }
                    catch (error) {
                        return res.status(500).json({ msg: error.message })
                    }
                }
            }
        )
    }
    else {
        res.status(404).json({ failure: "Token Not Found." })
    }

}

export default authJwt;