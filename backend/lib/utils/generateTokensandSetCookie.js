import jwt from "jsonwebtoken";

export const generateTokensAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "5d" });

    res.cookie("jwt", token, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevents client side js from accessing the cookie
        sameSite: "strict",//prevents csrf attacks from cross-site requests
        secure: process.env.NODE_ENV !== "development" //only send the cookie over https in production
    });
};

