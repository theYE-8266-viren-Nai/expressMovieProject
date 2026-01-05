import jwt from "jsonwebtoken"
import { prisma } from "../config/db.js"

//Read the token from the request 
//Check if that token is valid 
export default async (req, res, next) => {
    console.log("Auth middleware reached");
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorzied , no token provided " })
    }
    try {
        // 2. Verify token and extract the user Id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
                // password: false (implicitly excluded)
            }
        });

        if (!user) {
            return res.status(401).json({ error: "User no longer exists" });
        }

        // 3. Attach user to request object and move to next middleware
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Not authorized, token failed" });
    }
};