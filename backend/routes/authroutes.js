import express from "express";
import { signup, login, profile, logout } from "../controllers/authcontroller.js";
import authenticateJWT from "../middlewares/authenticateJwt.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticateJWT, profile);
router.post("/logout", logout);

export default router;
