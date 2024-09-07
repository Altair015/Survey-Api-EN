import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

const { JWT_SECRET, JWT_EXPIRY } = process.env;

// Controller for taking the username and password and returing a JWT token.
export const signIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ msg: "username or Password field cannot be empty." });
    }

    else {
        const JWT_TOKEN = jwt.sign({ id: username }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
        return res.status(201).json(
            {
                msg: "You have logged in successfully.",
                auth_token: JWT_TOKEN,
            }
        )
    }
}