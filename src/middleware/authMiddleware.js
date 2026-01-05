import jwt from "jsonwebtoken"
import {prisma} from "../config/db.js"

//Read the token from the request 
//Check if that token is valid 
 const authMiddleware = async(req , res , next) => {
    console.log("midddleware applied");
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        console.log("authorized");
}
    next();
}
export default authMiddleware