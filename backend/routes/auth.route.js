import express from "express";
import { signup, login, logout, getUserDetails } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import passport from "passport";
import { generateTokensAndSetCookie } from "../lib/utils/generateTokensandSetCookie.js";

const router = express.Router();


router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.get("/me", protectRoute, getUserDetails)


// Google Authentication Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Authentication Callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        generateTokensAndSetCookie(req.user._id, res);
        res.redirect("http://localhost:5173/dashboard"); // Redirect to frontend
    }
);


export default router;
