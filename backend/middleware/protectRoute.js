import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
    try {
        //getting the token from the cookie
        const token = req.cookies.jwt;

        //if no token is found
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        }

        //verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                error: "Unauthorized: Invalid token"
            })
        }


        //getting the user from the database
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized: User not found"
            })
        }

        req.user = user;
        next();


    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message
        })
    }
}

export default protectRoute;
