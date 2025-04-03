import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authenticateJWT from "../middlewares/authenticateJwt.js";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());


const JWT_SECRET = process.env.JWT_SECRET;
app.get("/good", (req, res) => {    
    res.status(200).json({ message: "Good" });
  });
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ message: "User already exists" });
    }
  });
  
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
});

app.get("/profile", authenticateJWT, async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true },
    });
  
    res.json({ user });
});
app.post("/logout", (req, res) => {
    res.clearCookie("token").json({ message: "Logged out" });
});
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  
  
